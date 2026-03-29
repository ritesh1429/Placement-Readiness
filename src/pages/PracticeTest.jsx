import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { technicalQuestions } from '../data/questions';

const PracticeTest = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestions = technicalQuestions.filter(q => q.subject === subjectId);

  // If invalid subject, guide them back
  if (currentQuestions.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Subject Not Found</h2>
        <button onClick={() => navigate('/roadmaps')} className="btn-primary">Return to Roadmaps</button>
      </div>
    );
  }

  const handleOptionSelect = (questionId, option) => {
    if (isSubmitted) return; // Prevent changing answer after submission
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });
    return correct;
  };

  const handleComplete = () => {
    setIsSubmitted(true);
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === currentQuestions.length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '800px', margin: '3rem auto 5rem' }}
    >
      <button 
        onClick={() => navigate('/roadmaps', { state: { focusSubject: subjectId } })} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem' }}
      >
        <ArrowLeft size={18} /> Back to {subjectId} Roadmap
      </button>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{subjectId} Practice Test</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Evaluate your understanding in an isolated environment.
          {!isSubmitted && ` (${answeredCount} / ${currentQuestions.length} answered)`}
        </p>
      </div>

      {isSubmitted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel" 
          style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '3rem', borderLeft: `6px solid ${calculateScore() >= currentQuestions.length / 2 ? '#10b981' : '#ef4444'}` }}
        >
          <Target className="text-gradient" size={48} style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{calculateScore()} / {currentQuestions.length}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {calculateScore() === currentQuestions.length 
              ? `Flawless! You've mastered the basics of ${subjectId}.` 
              : calculateScore() >= currentQuestions.length / 2 
                ? `Good job! Review the incorrect questions below.`
                : `Keep practicing! Generating a stronger foundation will help.`}
          </p>
          <button onClick={() => navigate('/roadmaps', { state: { focusSubject: subjectId } })} className="btn-primary" style={{ marginTop: '2rem' }}>
             Return to Syllabus
          </button>
        </motion.div>
      )}

      <div className="glass-panel" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {currentQuestions.map((q, index) => {
            const hasAnswered = !!answers[q.id];
            const isCorrect = answers[q.id] === q.answer;

            return (
              <div key={q.id}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '1.25rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-primary)', minWidth: '24px' }}>{index + 1}.</span>
                  <span>{q.question}</span>
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === opt;
                    const isActualAnswer = opt === q.answer;
                    
                    let bgStyle = 'rgba(255,255,255,0.03)';
                    let borderStyle = '1px solid rgba(255,255,255,0.05)';
                    let Icon = null;

                    if (isSubmitted) {
                      if (isActualAnswer) {
                        bgStyle = 'rgba(16, 185, 129, 0.15)'; // Green for correct answer invariably
                        borderStyle = '1px solid #10b981';
                        Icon = CheckCircle;
                      } else if (isSelected && !isActualAnswer) {
                        bgStyle = 'rgba(239, 68, 68, 0.15)'; // Red for wrong selected
                        borderStyle = '1px solid #ef4444';
                        Icon = XCircle;
                      }
                    } else if (isSelected) {
                      bgStyle = 'rgba(59, 130, 246, 0.1)';
                      borderStyle = '1px solid var(--accent-primary)';
                    }

                    return (
                      <label 
                        key={i} 
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '1rem',
                          background: bgStyle,
                          border: borderStyle,
                          borderRadius: '8px',
                          cursor: isSubmitted ? 'default' : 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <input 
                            type="radio" 
                            name={q.id} 
                            value={opt}
                            disabled={isSubmitted}
                            checked={isSelected}
                            onChange={() => handleOptionSelect(q.id, opt)}
                            style={{ accentColor: 'var(--accent-primary)', transform: 'scale(1.2)' }}
                          />
                          <span style={{ fontSize: '0.95rem', color: isSubmitted && isSelected && !isActualAnswer ? '#f87171' : isSubmitted && isActualAnswer ? '#34d399' : 'inherit' }}>{opt}</span>
                        </div>
                        {isSubmitted && Icon && <Icon size={20} color={isActualAnswer ? '#10b981' : '#ef4444'} />}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!isSubmitted && (
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={handleComplete} 
              disabled={!isComplete}
              className="btn-primary" 
              style={{ padding: '1rem 4rem', opacity: isComplete ? 1 : 0.5 }}
            >
              Submit Practice Test
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PracticeTest;
