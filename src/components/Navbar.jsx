import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Target, ArrowRight, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE from '../config';

const aptitudeCompanies = [
  'Google', 'Amazon', 'Microsoft',
  'Accenture', 'Capgemini', 'Cognizant GenC',
  'Deloitte', 'Infosys', 'Wipro WILP', 'Zoho'
];

const placementExams = [
  'TCS Ninja', 'TCS Digital', 'TCS NQT',
  'Cognizant GenC', 'Cognizant GenC Next',
  'Wipro WILP', 'Infosys', 'MulticoreWare'
];

const Navbar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // Verify the JWT with the actual MongoDB database on navigation
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setDbUser(data.user);
        } else {
          // Token invalid or expired
          handleSignOut();
        }
      })
      .catch(err => console.error("Database connection error verifying session."));
    } else {
      setDbUser(null);
    }
  }, [location.pathname, token]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    setDbUser(null);
    navigate('/');
  };

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative' // relative for absolute positioning of mega-menu
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <Target className="text-gradient" size={28} />
          <span>Place<span className="text-gradient">Ready</span></span>
        </Link>
        
        {/* Authenticated Database User Display - Top Left Corner */}
        {isAuthenticated && dbUser && (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '0.75rem', 
            paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 600 
            }}>
              {dbUser.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.2 }}>{dbUser.name}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Student</span>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none' }}>Home</Link>
        <Link to="/roadmaps" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none' }}>Roadmaps</Link>
        
        {/* Company Prep with Mega Menu */}
        <div 
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
          style={{ position: 'relative', padding: '1.5rem 0' }} // padding makes hovering contiguous
        >
          <Link 
            to="/company-prep" 
            className="text-muted" 
            style={{ 
              fontWeight: 500, 
              color: isMegaMenuOpen ? '#fff' : 'inherit', 
              transition: 'color 0.2s', 
              textDecoration: 'none',
              borderBottom: isMegaMenuOpen ? '2px solid #bef264' : 'none', // lime-green underline like in the screenshot
              paddingBottom: '0.25rem'
            }}
          >
            Company Specific
          </Link>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {isMegaMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '900px', // Large modal
                  background: 'rgba(15, 23, 42, 0.95)', // Tailored glass dark look
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  padding: '2.5rem',
                  zIndex: 50,
                  cursor: 'default'
                }}
              >
                {/* Vertical Divider */}
                <div style={{ position: 'absolute', left: '50%', top: '2.5rem', bottom: '2.5rem', width: '1px', background: 'rgba(255,255,255,0.08)' }}></div>

                {/* Column 1: Aptitude Questions */}
                <div style={{ paddingRight: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <button 
                    onClick={() => navigate('/practice/Aptitude')}
                    style={{
                      background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                      padding: '0.75rem 1.5rem', borderRadius: '4px', alignSelf: 'flex-start',
                      fontWeight: 600, fontSize: '0.95rem', marginBottom: '2rem', cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.target.style.background = '#000'}
                  >
                    Aptitude Questions
                  </button>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', rowGap: '1.25rem' }}>
                    {aptitudeCompanies.map(company => (
                      <Link 
                        key={company} 
                        to="/company-prep" 
                        state={{ focusCompany: company }}
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.target.style.color = '#fff'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                      >
                        {company}
                      </Link>
                    ))}
                  </div>

                  <Link to="/company-prep" style={{ color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, marginTop: '2.5rem' }}>
                    View All <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Column 2: Placement Exams */}
                <div style={{ paddingLeft: '3rem', display: 'flex', flexDirection: 'column' }}>
                  <button 
                    onClick={() => navigate('/company-prep')}
                    style={{
                      background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                      padding: '0.75rem 1.5rem', borderRadius: '4px', alignSelf: 'flex-start',
                      fontWeight: 600, fontSize: '0.95rem', marginBottom: '2rem', cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.target.style.background = '#000'}
                  >
                    Placement Exams
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', rowGap: '1.25rem' }}>
                    {placementExams.map(exam => (
                      <Link 
                        key={exam} 
                        to="/company-prep" 
                        state={{ focusCompany: exam }}
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.target.style.color = '#fff'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                      >
                        {exam}
                      </Link>
                    ))}
                  </div>

                  <Link to="/company-prep" style={{ color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, marginTop: '2.5rem' }}>
                    View All <ArrowRight size={16} />
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
          {isAuthenticated ? (
            <button 
              onClick={handleSignOut}
              style={{ 
                background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', 
                padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' 
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.border = '1px solid rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1px solid rgba(239, 68, 68, 0.3)';
              }}
            >
              Sign Out
              <LogOut size={16} />
            </button>
          ) : (
            <Link 
              to="/login" 
              style={{ 
                color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
                padding: '0.5rem 1rem', transition: 'color 0.2s' 
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#cbd5e1'}
            >
              Sign In
            </Link>
          )}
          <Link to="/assessment" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem', textDecoration: 'none' }}>Analyze Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
