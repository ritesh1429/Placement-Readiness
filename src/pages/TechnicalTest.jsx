import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Share2, Database, Box, Waypoints, CheckCircle } from 'lucide-react';
import { technicalQuestions } from '../data/questions';

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

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScores = () => {
    const scores = { OS: 0, CN: 0, DBMS: 0, OOPS: 0, DSA: 0 };
    
    technicalQuestions.forEach(q => {
      if (answers[q.id] === q.answer) {
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

    navigate('/dashboard', { state: { profileData, techScores: scaledScores } });
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '1000px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Technical Proficiency Test</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Answer these domain-specific questions to accurately map your skill gaps.
          ({answeredCount} / {testQuestions.length} completed)
        </p>
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
        </div>

      </div>
    </motion.div>
  );
};

export default TechnicalTest;
