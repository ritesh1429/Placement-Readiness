import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Send, ChevronLeft, Terminal } from 'lucide-react';
import API_BASE from '../config';

const CodingEnvironment = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c++');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/code/problems/${problemId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProblem(data);
        
        // Set initial code based on selected language
        const startCode = data.startCode?.find(sc => sc.language === language);
        if (startCode) {
          setCode(startCode.initialCode);
        }
      } catch (err) {
        console.error('Failed to fetch problem', err);
      }
    };
    fetchProblem();
  }, [problemId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (problem) {
      const startCode = problem.startCode?.find(sc => sc.language === newLang);
      if (startCode) {
        setCode(startCode.initialCode);
      }
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and running against visible test cases...');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/code/run/${problemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code, language })
      });
      const data = await res.json();
      
      let outStr = '';
      if (data.testCases) {
        data.testCases.forEach((tc, i) => {
          outStr += `Test Case ${i + 1}: ${tc.status_id === 3 ? 'Passed ✅' : 'Failed ❌'}\n`;
          if (tc.status_id !== 3 && tc.compile_output) {
            outStr += `Error:\n${atob(tc.compile_output || '')}\n`;
          }
        });
      } else {
        outStr = data.error || 'Execution failed';
      }
      setOutput(outStr);
    } catch (err) {
      setOutput('Network error during execution.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput('Submitting against hidden test cases...');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/code/submit/${problemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code, language })
      });
      const data = await res.json();
      
      let outStr = `Status: ${data.status.toUpperCase()}\n`;
      outStr += `Test Cases Passed: ${data.testCasesPassed} / ${data.testCasesTotal}\n`;
      outStr += `Runtime: ${data.runtime} ms\n`;
      if (data.errorMessage) {
        outStr += `Error: ${data.errorMessage}\n`;
      }
      setOutput(outStr);
    } catch (err) {
      setOutput('Network error during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) return <div style={{ color: '#fff', padding: '2rem' }}>Loading Editor...</div>;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', background: '#0f172a' }}>
      {/* Left Pane: Problem Description */}
      <div style={{ flex: '1', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/coding-challenges')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <ChevronLeft size={24} />
          </button>
          <h2 style={{ color: '#f8fafc', margin: 0, fontSize: '1.25rem' }}>{problem.title}</h2>
          <span style={{ 
            marginLeft: 'auto',
            color: problem.difficulty === 'easy' ? '#4ade80' : problem.difficulty === 'medium' ? '#fbbf24' : '#ef4444',
            fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase'
          }}>
            {problem.difficulty}
          </span>
        </div>
        
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, color: '#cbd5e1', lineHeight: '1.6' }}>
          <div style={{ whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>{problem.description}</div>
          
          <h3 style={{ color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Examples</h3>
          {problem.visibleTestCases?.map((tc, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Input:</strong> <pre style={{ display: 'inline', background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{tc.input.replace(/\n/g, ' ')}</pre></div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Output:</strong> <pre style={{ display: 'inline', background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{tc.output}</pre></div>
              {tc.explanation && <div><strong>Explanation:</strong> {tc.explanation}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Editor & Console */}
      <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column' }}>
        {/* Editor Toolbar */}
        <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <select 
            value={language} 
            onChange={handleLanguageChange}
            style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.75rem', borderRadius: '4px', outline: 'none' }}
          >
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              style={{ 
                background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', 
                padding: '0.5rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                opacity: (isRunning || isSubmitting) ? 0.5 : 1
              }}
            >
              <Play size={16} /> Run Code
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              style={{ 
                background: '#bef264', color: '#0f172a', border: 'none', fontWeight: 600,
                padding: '0.5rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                opacity: (isRunning || isSubmitting) ? 0.5 : 1
              }}
            >
              <Send size={16} /> Submit
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div style={{ flex: '2', position: 'relative' }}>
          <Editor
            height="100%"
            theme="vs-dark"
            language={language === 'c++' ? 'cpp' : language}
            value={code}
            onChange={(val) => setCode(val)}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 }
            }}
          />
        </div>

        {/* Console / Terminal */}
        <div style={{ flex: '1', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', background: '#000' }}>
          <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={16} /> Console Output
          </div>
          <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, fontFamily: 'monospace', color: '#4ade80', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
            {output || 'Run your code to see the output here.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingEnvironment;
