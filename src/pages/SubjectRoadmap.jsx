import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Share2, Database, Box, Waypoints, Target, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
import { placementRoadmaps } from '../data/roadmaps';

const subjects = [
  { id: 'OS', label: 'Operating Systems', icon: Server },
  { id: 'CN', label: 'Computer Networks', icon: Share2 },
  { id: 'DBMS', label: 'DBMS', icon: Database },
  { id: 'OOPS', label: 'OOPS', icon: Box },
  { id: 'DSA', label: 'DSA', icon: Waypoints }
];

const SubjectRoadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Default to OS, or pull from router state if user clicked a specific subject from Dashboard
  const initialSubject = location.state?.focusSubject || 'OS';
  const [activeSubject, setActiveSubject] = useState(initialSubject);
  const [revealedHints, setRevealedHints] = useState({});

  useEffect(() => {
    if (location.state?.focusSubject) {
      setActiveSubject(location.state.focusSubject);
    }
  }, [location.state]);

  const toggleHint = (index) => {
    setRevealedHints(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const currentData = placementRoadmaps[activeSubject];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '1100px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Placement Preparation Hub</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Syllabus roadmaps and high-frequency interview questions for core subjects.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2.5rem' }}>
        
        {/* Sidebar Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {subjects.map(sub => {
            const Icon = sub.icon;
            const isActive = activeSubject === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveSubject(sub.id);
                  setRevealedHints({}); // Reset hints when switching
                }}
                className="glass-panel"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.25rem',
                  background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  borderRadius: '12px'
                }}
              >
                <div style={{ 
                  background: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', 
                  padding: '0.5rem', 
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} color={isActive ? '#fff' : 'currentColor'} />
                </div>
                <span style={{ fontWeight: isActive ? 600 : 500, fontSize: '1.05rem' }}>{sub.label}</span>
              </button>
            );
          })}
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px dashed var(--accent-primary)', textAlign: 'center' }}>
            <Target className="text-gradient" size={28} style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Ready to test your knowledge?</p>
            <button onClick={() => navigate(`/practice/${activeSubject}`)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: '100%' }}>Take {activeSubject} Mock Test</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '3rem', minHeight: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{currentData.title}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{currentData.description}</p>
              </div>

              {/* Roadmap Phases Section */}
              <div style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <BookOpen className="text-gradient" size={24} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Structured Roadmap</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {currentData.phases.map((phase, i) => (
                    <div key={i} style={{ 
                      padding: '1.5rem', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderRadius: '8px', 
                      borderLeft: '4px solid var(--accent-primary)' 
                    }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>{phase.title}</h4>
                      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {phase.items.map((item, j) => (
                          <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle size={16} color="var(--accent-primary)" opacity={0.7} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Questions Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <HelpCircle className="text-gradient" size={24} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Top 5 Interview Questions</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentData.practiceQuestions.map((qa, index) => (
                    <div key={index} style={{ 
                      padding: '1.5rem', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5, marginBottom: '1rem' }}>
                         <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}>Q{index + 1}.</span>
                         {qa.q}
                      </h4>
                      
                      <button 
                        onClick={() => toggleHint(index)}
                        style={{ 
                          background: 'transparent', border: 'none', color: 'var(--text-muted)', 
                          cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0
                        }}>
                        {revealedHints[index] ? 'Hide Answer/Hint' : 'View Answer/Hint'}
                      </button>

                      <AnimatePresence>
                        {revealedHints[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '0.95rem', borderLeft: '3px solid var(--accent-primary)' }}>
                              <p style={{ margin: 0 }}><strong>Hint:</strong> {qa.hint}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default SubjectRoadmap;
