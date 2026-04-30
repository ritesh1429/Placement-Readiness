import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopicQuestions } from '../data/topicQuestions';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const TopicQuiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Decode URI component assuming topic might have spaces like /quiz/Quantitative%20Aptitude
  // Though topicId usually comes in clean if we encode it. Let's ensure string safety.
  const decodedTopic = decodeURIComponent(topicId);
  const questions = getTopicQuestions(decodedTopic);

  const handleSelect = (optionValue) => {
    if (showResults) return; // Prevent changing after submission
    setAnswers({ ...answers, [currentQuestion]: optionValue });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) score += 1;
    });
    return score;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={{ maxWidth: '800px', margin: '4rem auto 6rem', padding: '0 2rem' }}
    >
      <button 
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem' }}
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      {!showResults ? (
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <div>
               <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{decodedTopic} Quiz</h2>
               <p style={{ color: 'var(--text-secondary)' }}>Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '1.2rem' }}>
              Q{currentQuestion + 1}
            </div>
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               key={currentQuestion}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.2 }}
             >
                <h3 style={{ fontSize: '1.4rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '2.5rem' }}>
                  {questions[currentQuestion].q}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {questions[currentQuestion].options.map((opt, idx) => {
                    const isSelected = answers[currentQuestion] === opt;
                    return (
                      <button 
                        key={idx}
                        onClick={() => handleSelect(opt)}
                        style={{
                          padding: '1.25rem', textAlign: 'left', fontSize: '1.1rem',
                          background: isSelected ? 'rgba(190, 242, 100, 0.1)' : 'rgba(255,255,255,0.03)',
                          border: `2px solid ${isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                          borderRadius: '8px', cursor: 'pointer', color: '#fff',
                          transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '1rem'
                        }}
                      >
                         <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-primary)' }} />}
                         </div>
                         {opt}
                      </button>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                  <button 
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className={answers[currentQuestion] ? "btn-primary" : ""}
                    style={{ 
                      opacity: answers[currentQuestion] ? 1 : 0.5,
                      cursor: answers[currentQuestion] ? 'pointer' : 'not-allowed',
                      padding: '0.75rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      ...( !answers[currentQuestion] && { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '8px' } )
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next Question'} <ArrowRight size={20} />
                  </button>
                </div>
             </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        // RESULTS VIEW
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ padding: '4rem 3rem', textAlign: 'center' }}>
           <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Quiz Completed!</h2>
           <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>You just finished the {decodedTopic} assessment.</p>
           
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '200px' }}>
                 <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Score</p>
                 <h3 style={{ fontSize: '4rem', color: 'var(--accent-primary)', margin: 0 }}>{calculateScore()}</h3>
                 <p style={{ color: 'var(--text-secondary)' }}>out of 5</p>
              </div>
           </div>

           <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Review Answers</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {questions.map((q, idx) => {
                  const isCorrect = answers[idx] === q.answer;
                  return (
                    <div key={idx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
                       <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{q.q}</p>
                       <div style={{ display: 'flex', gap: '2rem' }}>
                          <span style={{ color: isCorrect ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />} Your Answer: {answers[idx]}
                          </span>
                          {!isCorrect && (
                            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <CheckCircle size={18} /> Correct Answer: {q.answer}
                            </span>
                          )}
                       </div>
                    </div>
                  )
                })}
             </div>
           </div>
           
           <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
             Return to Landing Page
           </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TopicQuiz;
