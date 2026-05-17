import Problem from '../models/Problem.js';
import Submission from '../models/Submission.js';
import User from '../models/User.js';
import { getLanguageById, submitBatch, submitToken } from '../utils/problemUtility.js';

export const submitCode = async (req, res) => {
  console.log("Submit Code called");
  try {
    const userId = req.user.id;
    const problemId = req.params.id;
    const { code, language } = req.body;

    if (!userId || !code || !problemId || !language)
      return res.status(400).json({ error: "Some field missing" });

    if (req.body.language === "cpp") {
      req.body.language = "c++";
    }

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language: req.body.language,
      status: 'pending',
      testCasesTotal: problem.hiddenTestCases.length
    });

    const languageId = getLanguageById(req.body.language);

    const submissions = problem.hiddenTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;

    for (const test of testResult) {
      if (test.status_id == 3) {
        testCasesPassed++;
        runtime = runtime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        if (test.status_id == 4) {
          status = 'error';
          errorMessage = test.stderr;
        } else {
          status = 'wrong';
          errorMessage = test.stderr || test.compile_output;
        }
      }
    }

    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    if (status === 'accepted') {
      const user = await User.findById(userId);
      if (user && !user.problemSolved.includes(problemId)) {
        user.problemSolved.push(problemId);
        await user.save();
      }
    }

    res.status(201).json(submittedResult);
  } catch (err) {
    console.error("Submit error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const runCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.id;
    const { code, language } = req.body;

    if (!userId || !code || !problemId || !language)
      return res.status(400).json({ error: "Some field missing" });

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    if (req.body.language === "cpp") {
      req.body.language = "c++";
    }

    const languageId = getLanguageById(req.body.language);

    const submissions = problem.visibleTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for (const test of testResult) {
      if (test.status_id == 3) {
        testCasesPassed++;
        runtime = runtime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        status = false;
        errorMessage = test.stderr || test.compile_output;
      }
    }

    res.status(201).json({
      success: status,
      testCases: testResult,
      runtime,
      memory
    });
  } catch (err) {
    console.error("Run error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblems = async (req, res) => {
  try {
    // Return all problems but hide the hiddenTestCases and startCode/referenceSolution details
    const problems = await Problem.find().select('-hiddenTestCases -referenceSolution');
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-hiddenTestCases -referenceSolution');
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
