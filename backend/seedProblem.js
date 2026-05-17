import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import Problem from './models/Problem.js';
import User from './models/User.js';

dotenv.config({ path: './.env' });

const seedProblems = async () => {
  await connectDB();

  try {
    // Find the Master Admin to attach as the creator
    const admin = await User.findOne({ email: 'ritesh813222@gmail.com' });
    if (!admin) {
      console.error("Master Admin not found, cannot seed problem.");
      process.exit(1);
    }

    // Check if the problem already exists
    const existingProblem = await Problem.findOne({ title: 'Two Sum' });
    if (existingProblem) {
      console.log('✓ Problem already seeded');
      process.exit(0);
    }

    const twoSumProblem = new Problem({
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      difficulty: 'easy',
      tags: 'array',
      visibleTestCases: [
        {
          input: '4\n2 7 11 15\n9',
          output: '0 1',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: '3\n3 2 4\n6',
          output: '1 2',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      hiddenTestCases: [
        {
          input: '4\n2 7 11 15\n9',
          output: '0 1'
        },
        {
          input: '3\n3 2 4\n6',
          output: '1 2'
        },
        {
          input: '2\n3 3\n6',
          output: '0 1'
        }
      ],
      startCode: [
        {
          language: 'c++',
          initialCode: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}'
        },
        {
          language: 'javascript',
          initialCode: 'const readline = require("readline");\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on("line", (input) => {\n    // Write your code here\n});'
        }
      ],
      referenceSolution: [
        {
          language: 'javascript',
          completeCode: 'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\nrl.on("line", (line) => { input.push(line); });\nrl.on("close", () => {\n  let n = parseInt(input[0]);\n  let nums = input[1].split(" ").map(Number);\n  let target = parseInt(input[2]);\n  let map = new Map();\n  for(let i=0; i<n; i++) {\n    let diff = target - nums[i];\n    if(map.has(diff)) {\n      console.log(map.get(diff) + " " + i);\n      return;\n    }\n    map.set(nums[i], i);\n  }\n});'
        }
      ],
      problemCreator: admin._id
    });

    await twoSumProblem.save();
    console.log('✓ Seeded Two Sum problem successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding problem:', error);
    process.exit(1);
  }
};

seedProblems();
