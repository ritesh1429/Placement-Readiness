import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';
import API_BASE from '../config';

const CodingChallenges = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/code/problems`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error('Failed to fetch problems', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: '#fff' }}>Loading Challenges...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Code2 size={32} color="#bef264" />
        <h1 style={{ color: '#fff', margin: 0, fontSize: '2rem' }}>Coding Challenges</h1>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {problems.map((problem) => (
          <div key={problem._id} style={{ 
            background: 'rgba(30, 41, 59, 0.5)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '12px', 
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>{problem.title}</h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ 
                  color: problem.difficulty === 'easy' ? '#4ade80' : problem.difficulty === 'medium' ? '#fbbf24' : '#ef4444',
                  fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase'
                }}>
                  {problem.difficulty}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                  {problem.tags}
                </span>
              </div>
            </div>
            
            <Link 
              to={`/practice/coding/${problem._id}`} 
              className="btn-primary" 
              style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              Solve <ArrowRight size={16} />
            </Link>
          </div>
        ))}
        {problems.length === 0 && (
          <div style={{ color: '#94a3b8' }}>No coding challenges available yet.</div>
        )}
      </div>
    </div>
  );
};

export default CodingChallenges;
