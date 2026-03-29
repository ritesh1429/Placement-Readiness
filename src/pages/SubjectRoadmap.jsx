import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, Share2, Database, Box, Waypoints, Globe,
  Target, BookOpen, HelpCircle, CheckCircle2, Clock,
  ExternalLink, Zap, ChevronDown, ChevronUp
} from 'lucide-react';
import { placementRoadmaps } from '../data/roadmaps';

const subjects = [
  { id: 'OS',     label: 'Operating Systems',   icon: Server   },
  { id: 'CN',     label: 'Computer Networks',    icon: Share2   },
  { id: 'DBMS',   label: 'DBMS',                 icon: Database },
  { id: 'OOPS',   label: 'OOPS',                 icon: Box      },
  { id: 'DSA',    label: 'DSA',                  icon: Waypoints},
  { id: 'WEBDEV', label: 'Web Development',      icon: Globe    },
];

const difficultyConfig = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  Advanced:     { color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
};

const SubjectRoadmap = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const initialSubject = location.state?.focusSubject || 'OS';

  const [activeSubject,   setActiveSubject]   = useState(initialSubject);
  const [revealedHints,   setRevealedHints]   = useState({});
  const [expandedPhases,  setExpandedPhases]  = useState({});

  useEffect(() => {
    if (location.state?.focusSubject) {
      setActiveSubject(location.state.focusSubject);
      setRevealedHints({});
      setExpandedPhases({});
    }
  }, [location.state]);

  const toggleHint = (index) =>
    setRevealedHints(prev => ({ ...prev, [index]: !prev[index] }));

  const togglePhase = (index) =>
    setExpandedPhases(prev => ({ ...prev, [index]: !prev[index] }));

  const switchSubject = (id) => {
    setActiveSubject(id);
    setRevealedHints({});
    setExpandedPhases({});
  };

  const currentData = placementRoadmaps[activeSubject];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '1200px', margin: '3rem auto 5rem' }}
    >
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Placement Preparation Hub</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Detailed syllabus roadmaps, curated resources, and high-frequency interview questions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem' }}>

        {/* ── Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {subjects.map(sub => {
            const Icon     = sub.icon;
            const isActive = activeSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => switchSubject(sub.id)}
                className="glass-panel"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '1.1rem 1.25rem', textAlign: 'left', cursor: 'pointer',
                  background: isActive ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'}`,
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.2s', borderRadius: '12px'
                }}
              >
                <div style={{
                  background: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)',
                  padding: '0.45rem', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon size={18} color={isActive ? '#fff' : 'currentColor'} />
                </div>
                <span style={{ fontWeight: isActive ? 600 : 500, fontSize: '0.97rem' }}>{sub.label}</span>
              </button>
            );
          })}

          {/* Mock Test CTA */}
          <div style={{
            marginTop: '1.5rem', padding: '1.5rem',
            background: 'rgba(59,130,246,0.05)', borderRadius: '12px',
            border: '1px dashed var(--accent-primary)', textAlign: 'center'
          }}>
            <Target className="text-gradient" size={26} style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Ready to test your knowledge on {currentData.title.split(' ')[0]}?
            </p>
            <button
              onClick={() => navigate(`/practice/${activeSubject}`)}
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.88rem', width: '100%' }}
            >
              Take Mock Test →
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="glass-panel" style={{ padding: '2.75rem', minHeight: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Subject Header */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{currentData.title}</h2>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>
                      {currentData.description}
                    </p>
                  </div>
                  {currentData.totalDuration && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'rgba(190,242,100,0.08)', border: '1px solid rgba(190,242,100,0.2)',
                      borderRadius: '20px', padding: '0.5rem 1rem', flexShrink: 0
                    }}>
                      <Clock size={15} color="#bef264" />
                      <span style={{ fontSize: '0.88rem', color: '#bef264', fontWeight: 600 }}>{currentData.totalDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Roadmap Phases ── */}
              <div style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <BookOpen className="text-gradient" size={22} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Structured Roadmap</h3>
                </div>

                {/* Timeline */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute', left: '1.1rem', top: '2rem', bottom: '2rem',
                    width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
                    zIndex: 0
                  }} />

                  {currentData.phases.map((phase, i) => {
                    const diff   = difficultyConfig[phase.difficulty] || difficultyConfig.Intermediate;
                    const isOpen = expandedPhases[i] !== false; // default open

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ display: 'flex', gap: '1.25rem', position: 'relative', zIndex: 1 }}
                      >
                        {/* Phase Number Circle */}
                        <div style={{
                          width: '2.2rem', height: '2.2rem', borderRadius: '50%',
                          background: phase.color || 'var(--accent-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.85rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                          boxShadow: `0 0 12px ${phase.color || 'var(--accent-primary)'}50`
                        }}>
                          {i + 1}
                        </div>

                        {/* Phase Card */}
                        <div style={{
                          flex: 1, background: 'rgba(255,255,255,0.02)',
                          borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)',
                          borderLeft: `3px solid ${phase.color || 'var(--accent-primary)'}`,
                          overflow: 'hidden'
                        }}>
                          {/* Phase Header */}
                          <button
                            onClick={() => togglePhase(i)}
                            style={{
                              width: '100%', padding: '1.1rem 1.25rem',
                              background: 'transparent', border: 'none', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textAlign: 'left', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 600, fontSize: '1rem', color: '#e2e8f0' }}>{phase.title}</span>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {phase.duration && (
                                  <span style={{
                                    fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.07)', color: 'var(--text-muted)'
                                  }}>
                                    ⏱ {phase.duration}
                                  </span>
                                )}
                                {phase.difficulty && (
                                  <span style={{
                                    fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '12px',
                                    background: diff.bg, color: diff.color, fontWeight: 600
                                  }}>
                                    {phase.difficulty}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isOpen
                              ? <ChevronUp size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                              : <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                            }
                          </button>

                          {/* Phase Body */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                                  {/* Topics */}
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem', marginBottom: '1rem' }}>
                                    {phase.items.map((item, j) => (
                                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <CheckCircle2 size={14} color={phase.color || 'var(--accent-primary)'} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Phase Resources */}
                                  {phase.resources && phase.resources.length > 0 && (
                                    <div style={{
                                      display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
                                      paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.25rem', display: 'flex', alignItems: 'center' }}>📚</span>
                                      {phase.resources.map((res, k) => (
                                        <a
                                          key={k}
                                          href={res.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                            fontSize: '0.78rem', color: 'var(--accent-primary)',
                                            background: 'rgba(59,130,246,0.08)', padding: '0.2rem 0.65rem',
                                            borderRadius: '12px', textDecoration: 'none', transition: 'background 0.2s'
                                          }}
                                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.18)'}
                                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
                                        >
                                          {res.name} <ExternalLink size={10} />
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ── Interview Questions ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <HelpCircle className="text-gradient" size={22} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
                    Top Interview Questions
                    <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                      ({currentData.practiceQuestions.length} questions)
                    </span>
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentData.practiceQuestions.map((qa, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        padding: '1.5rem', background: 'rgba(255,255,255,0.02)',
                        borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <h4 style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1rem', color: '#e2e8f0' }}>
                        <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem', fontWeight: 700 }}>Q{index + 1}.</span>
                        {qa.q}
                      </h4>

                      <button
                        onClick={() => toggleHint(index)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.4rem',
                          background: 'transparent', border: 'none',
                          color: revealedHints[index] ? 'var(--accent-primary)' : 'var(--text-muted)',
                          cursor: 'pointer', fontSize: '0.88rem', padding: 0, transition: 'color 0.2s'
                        }}
                      >
                        <Zap size={14} />
                        {revealedHints[index] ? 'Hide Answer' : 'Show Answer / Hint'}
                      </button>

                      <AnimatePresence>
                        {revealedHints[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{
                              padding: '1rem 1.25rem', background: 'rgba(59,130,246,0.08)',
                              borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)'
                            }}>
                              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                <strong style={{ color: '#e2e8f0' }}>Hint: </strong>{qa.hint}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
