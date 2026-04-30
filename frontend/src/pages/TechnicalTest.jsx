import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Share2, Database, Box, Waypoints, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { technicalQuestions } from '../data/questions';
import API_BASE from '../config';

const subjects = [
  { id: 'OS', label: 'Operating Systems', icon: Server },
  { id: 'CN', label: 'Computer Networks', icon: Share2 },
  { id: 'DBMS', label: 'DBMS', icon: Database },
  { id: 'OOPS', label: 'OOPS', icon: Box },
  { id: 'DSA', label: 'DSA', icon: Waypoints }
];

const TechnicalTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileData = location.state?.profileData || null;

  const [activeSubject, setActiveSubject] = useState('OS');
  const [answers, setAnswers] = useState({});

  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScores = async () => {
    const currentAnswers = answersRef.current;
    const scores = { OS: 0, CN: 0, DBMS: 0, OOPS: 0, DSA: 0 };
    
    technicalQuestions.forEach(q => {
      if (currentAnswers[q.id] === q.answer) {
        scores[q.subject] += 1;
      }
    });

    // Scale scores since we currently have 10 questions per subject instead of 20
    // If you expand to 20 later, you can remove this scaling factor.
    const maxQuestionsCurrent = 10; 
    const maxQuestionsDesired = 20;
    const scale = maxQuestionsDesired / maxQuestionsCurrent;

    const scaledScores = {
      OS: scores.OS * scale,
      CN: scores.CN * scale,
      DBMS: scores.DBMS * scale,
      OOPS: scores.OOPS * scale,
      DSA: scores.DSA * scale,
      maxPossible: maxQuestionsDesired
    };

    const token = localStorage.getItem('token');
    if (token) {
      const totalScore = scaledScores.OS + scaledScores.CN + scaledScores.DBMS + scaledScores.OOPS + scaledScores.DSA;
      const totalMax = maxQuestionsDesired * 5;
      try {
        await fetch(`${API_BASE}/api/assessments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            test_type: 'Technical Test',
            subject: 'Overall',
            score: totalScore,
            total: totalMax
          })
        });
      } catch (error) {
        console.error('Failed to save assessment:', error);
      }
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }

    navigate('/dashboard', { state: { profileData, techScores: scaledScores } });
  };

  const calculateScoresRef = useRef(calculateScores);
  useEffect(() => {
    calculateScoresRef.current = calculateScores;
  }, [calculateScores]);

  const startTest = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.error(err));
    }
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted) return;
    
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up! Submitting test automatically.");
          calculateScoresRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fullscreen exit listener
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            alert("You exited full-screen twice. The test has been automatically submitted.");
            calculateScoresRef.current();
          } else {
            setShowWarning(true);
          }
          return newCount;
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [hasStarted]);

  const returnToTest = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.error(err));
    }
    setShowWarning(false);
  };

  if (!profileData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>No Profile Data Found</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Please complete the assessment form first.</p>
        <button onClick={() => navigate('/assessment')} className="btn-primary">Go to Assessment Form</button>
      </div>
    );
  }

  const currentQuestions = technicalQuestions.filter(q => q.subject === activeSubject);

  const validSubjects = subjects.map(s => s.id);
  const testQuestions = technicalQuestions.filter(q => validSubjects.includes(q.subject));

  // Check if all questions are answered across all subjects
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === testQuestions.length;

  if (!hasStarted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', maxWidth: '600px', margin: '5rem auto', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Technical Proficiency Test</h2>
        <div style={{ textAlign: 'left', marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '1rem' }}><strong>Duration:</strong> 30 Minutes</p>
          <p style={{ marginBottom: '1rem' }}><strong>Important Rules:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>This test is strictly proctored and must be taken in <strong>Full-Screen mode</strong>.</li>
            <li style={{ marginBottom: '0.5rem' }}>If you exit full-screen mode, you will receive <strong>1 warning</strong>.</li>
            <li style={{ marginBottom: '0.5rem' }}>If you exit full-screen mode a second time, your test will be <strong>automatically submitted</strong>.</li>
            <li>When the timer reaches zero, the test will automatically submit.</li>
          </ul>
        </div>
        <button onClick={startTest} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Start Test (Enters Full-Screen)
        </button>
      </div>
    );
  }

  if (showWarning) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0f172a', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '2.5rem', color: '#ef4444', marginBottom: '1rem' }}>Warning: Full-Screen Exited</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
          You have left full-screen mode. This is your <strong>FIRST AND ONLY WARNING</strong>. If you exit full-screen again, your test will be automatically submitted and ended.
        </p>
        <button onClick={returnToTest} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Return to Full-Screen and Continue
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '1000px', margin: '0 auto 5rem', padding: '2rem' }}
    >
      {/* Sticky Header with Timer */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)',
        padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Technical Proficiency Test</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Answered: {answeredCount} / {testQuestions.length}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(190, 242, 100, 0.1)', padding: '0.75rem 1.25rem', borderRadius: '8px', border: `1px solid ${timeLeft < 300 ? '#ef4444' : '#bef264'}` }}>
          <Clock size={20} color={timeLeft < 300 ? '#ef4444' : '#bef264'} />
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: timeLeft < 300 ? '#ef4444' : '#bef264', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        
        {/* Sidebar / Tabs */}
        <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Subjects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {subjects.map(sub => {
              const Icon = sub.icon;
              const isActive = activeSubject === sub.id;
              
              const subjectQuestions = technicalQuestions.filter(q => q.subject === sub.id);
              const subjectAnswered = subjectQuestions.filter(q => answers[q.id]).length;
              const isSubjectComplete = subjectAnswered === subjectQuestions.length;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubject(sub.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem',
                    background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '8px',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? "var(--accent-primary)" : "currentColor"} />
                    <span style={{ fontWeight: isActive ? 600 : 400 }}>{sub.id}</span>
                  </div>
                  {isSubjectComplete && <CheckCircle size={16} color="#10b981" />}
                </button>
              );
            })}
          </div>
          
          <div style={{ marginTop: '3rem' }}>
             <button 
                onClick={calculateScores} 
                disabled={!isComplete}
                className="btn-primary" 
                style={{ width: '100%', opacity: isComplete ? 1 : 0.5 }}
             >
                Submit Test
             </button>
             {!isComplete && <p style={{ fontSize: '0.8rem', color: '#ef4444', textAlign: 'center', marginTop: '0.75rem' }}>Ensure all questions are answered.</p>}
          </div>
        </div>

        {/* Question Area */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem' }}>{subjects.find(s => s.id === activeSubject)?.label}</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              {currentQuestions.map((q, index) => (
                <div key={q.id}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}>{index + 1}.</span>
                    {q.question}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {q.options.map((opt, i) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <label 
                          key={i} 
                          style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem',
                            background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <input 
                            type="radio" 
                            name={q.id} 
                            value={opt}
                            checked={isSelected}
                            onChange={() => handleOptionSelect(q.id, opt)}
                            style={{ accentColor: 'var(--accent-primary)', transform: 'scale(1.2)' }}
                          />
                          <span style={{ fontSize: '0.95rem' }}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {subjects.findIndex(s => s.id === activeSubject) < subjects.length - 1 && (
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button 
                onClick={() => {
                  const nextIndex = subjects.findIndex(s => s.id === activeSubject) + 1;
                  setActiveSubject(subjects[nextIndex].id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Next: {subjects[subjects.findIndex(s => s.id === activeSubject) + 1].label} →
              </button>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default TechnicalTest;
