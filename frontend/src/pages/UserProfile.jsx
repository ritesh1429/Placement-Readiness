import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Mail, Calendar } from 'lucide-react';
import API_BASE from '../config';

const UserProfile = () => {
  const [testHistory, setTestHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch Profile Data
          const userRes = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUserProfile(userData.user);
          }

          // Fetch History Data
          const historyRes = await fetch(`${API_BASE}/api/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (historyRes.ok) {
            const data = await historyRes.json();
            setTestHistory(data.history || []);
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '10rem' }}>Loading Profile...</div>;
  }

  if (!userProfile) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Please Log In</h2>
        <p className="text-muted">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '1000px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem',
          background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 600 
        }}>
          {userProfile.name.charAt(0).toUpperCase()}
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{userProfile.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <Mail size={16} />
          <span>{userProfile.email}</span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <BookOpen className="text-gradient" size={28} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Past Test Results</h2>
        </div>
        
        {testHistory.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Test Type</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Subject</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test) => (
                  <tr key={test._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} color="var(--text-muted)" />
                        {new Date(test.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>{test.test_type}</td>
                    <td style={{ padding: '1rem' }}>{test.subject}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        color: (test.score / test.total) >= 0.7 ? '#10b981' : (test.score / test.total) >= 0.5 ? '#f59e0b' : '#ef4444',
                        fontWeight: 600 
                      }}>
                        {test.score} / {test.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted" style={{ textAlign: 'center', padding: '2rem 0' }}>No past test results found. Take a Practice Test or Technical Test to see your history here.</p>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfile;
