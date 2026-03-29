import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, RefreshCw, BarChart2, BookOpen } from 'lucide-react';

const ResultsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  
  const profileData = location.state?.profileData || null;
  const techScores = location.state?.techScores || null; // e.g. { OS: 15, CN: 12, ... maxPossible: 20 }

  useEffect(() => {
    if (!profileData) return;

    // 1. Profile Scoring Algorithm (Max: 100 if no tech test, Max 50 if tech test exists)
    const cgpa = parseFloat(profileData.cgpa) || 0;
    const dsa = parseInt(profileData.dsaSolved) || 0;
    const projects = parseInt(profileData.devProjects) || 0;
    const interns = parseInt(profileData.internships) || 0;
    const certs = parseInt(profileData.certifications) || 0;

    let profileScore = 0;
    profileScore += Math.min((cgpa / 10) * 30, 30);
    profileScore += Math.min((dsa / 400) * 30, 30);
    profileScore += Math.min((projects / 3) * 20, 20);
    profileScore += Math.min((interns / 2) * 10, 10);
    profileScore += Math.min((certs / 2) * 10, 10);

    let finalScore = 0;
    const recs = [];

    // 2. Technical Scoring Integration
    if (techScores) {
      // Tech score out of 100
      const totalTechScore = techScores.OS + techScores.CN + techScores.DBMS + techScores.OOPS + techScores.DSA;
      const maxTotalTechScore = techScores.maxPossible * 5; // 5 subjects
      const techPercentage = (totalTechScore / maxTotalTechScore) * 100;
      
      // Combine: 50% Profile, 50% Technical
      finalScore = (profileScore * 0.5) + (techPercentage * 0.5);

      // Tech-specific recommendations
      Object.entries(techScores).forEach(([subject, val]) => {
        if (subject === 'maxPossible') return;
        const percentage = (val / techScores.maxPossible) * 100;
        
        if (percentage < 50) {
          recs.push({ type: 'warning', text: `Your ${subject} score is critically low (${Math.round(percentage)}%). Focus heavily on ${subject} fundamentals.` });
        } else if (percentage >= 80) {
          recs.push({ type: 'success', text: `Excellent grasp of ${subject} (${Math.round(percentage)}%). You are interview-ready for this topic.` });
        }
      });
    } else {
      finalScore = profileScore;
      recs.push({ type: 'info', text: 'Consider taking the Technical Test to get a more accurate evaluation!' });
    }

    setScore(Math.round(finalScore));

    // Profile-specific recommendations
    if (cgpa < 7.5) {
      recs.push({ type: 'warning', text: 'Pull up your CGPA. Many top product companies have a 7.5+ or 8.0+ cutoff.' });
    }
    if (dsa < 150) {
      recs.push({ type: 'warning', text: 'Focus heavily on Data Structures and Algorithms. Try doing 2-3 Leetcode questions daily.' });
    }
    if (projects < 2) {
      recs.push({ type: 'warning', text: 'Build at least 2 complete, deployed web/app development projects to showcase practical skills.' });
    }

    setRecommendations(recs);
  }, [profileData, techScores]);

  if (!profileData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>No Profile Data Found</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Please fill out the assessment form first.</p>
        <button onClick={() => navigate('/assessment')} className="btn-primary">Go to Assessment Form</button>
      </div>
    );
  }

  let scoreColor = '#ef4444'; 
  if (score >= 75) scoreColor = '#10b981'; 
  else if (score >= 50) scoreColor = '#f59e0b'; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '1000px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Readiness Analysis</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>AI-driven insights based on your academic Profile and Technical capabilities.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Left Column: Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Probability Score</h3>
            
            <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke={scoreColor} 
                  strokeWidth="8" 
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>{score}%</span>
              </div>
            </div>
            
            <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>
              {score >= 75 ? 'Highly Prepared' : score >= 50 ? 'On the Right Track' : 'Needs Improvement'}
            </p>
          </div>

          {/* Optional: Render Tech breakdown if available */}
          {techScores && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <BookOpen className="text-gradient" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Technical Breakdown</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.entries(techScores).filter(([key]) => key !== 'maxPossible').map(([subject, val]) => {
                  const percentage = (val / techScores.maxPossible) * 100;
                  const needsStudy = percentage < 70;

                  return (
                    <div key={subject}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <span>{subject}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{val} / {techScores.maxPossible}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1 }}
                          style={{ height: '100%', background: 'var(--accent-primary)', borderRadius: '3px' }}
                        />
                      </div>
                      {needsStudy && (
                        <button 
                          onClick={() => navigate('/roadmaps', { state: { focusSubject: subject } })}
                          style={{ 
                            background: 'transparent', border: 'none', color: 'var(--text-secondary)', 
                            fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0
                          }}
                        >
                           Study {subject} Syllabus →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Recommendations */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <BarChart2 className="text-gradient" size={28} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Skill Gaps & Recommendations</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {recommendations.map((rec, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.25rem', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  borderLeft: `4px solid ${rec.type === 'warning' ? '#ef4444' : rec.type === 'success' ? '#10b981' : '#3b82f6'}`,
                  borderRadius: '4px'
                }}
              >
                <div>
                  {rec.type === 'warning' && <AlertTriangle color="#ef4444" size={24} />}
                  {rec.type === 'success' && <CheckCircle color="#10b981" size={24} />}
                  {rec.type === 'info' && <TrendingUp color="#3b82f6" size={24} />}
                </div>
                <p style={{ lineHeight: 1.5 }}>{rec.text}</p>
              </motion.div>
            ))}
            {recommendations.length === 0 && (
              <p className="text-muted">You are doing perfectly across all domains mapped so far!</p>
            )}
          </div>
          
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
             <button onClick={() => navigate('/assessment')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>
               <RefreshCw size={18} /> Retake Assessment & Test
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;
