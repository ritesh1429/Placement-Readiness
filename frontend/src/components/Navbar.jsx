import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Target, ArrowRight, LogOut, User, UserPlus, X } from 'lucide-react';
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
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });
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
    localStorage.removeItem('userRole');
    setDbUser(null);
    navigate('/');
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/register-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(adminForm)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Admin created successfully!');
        setShowAddAdmin(false);
        setAdminForm({ name: '', email: '', password: '' });
      } else {
        alert(data.error || 'Failed to create admin');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', // relative for absolute positioning of mega-menu
      gap: '1rem',
      flexWrap: 'nowrap',
      overflowX: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <Target className="text-gradient" size={28} />
          <span>Place<span className="text-gradient">Ready</span></span>
        </Link>
        
        {/* Authenticated Database User Display - Top Left Corner */}
        {isAuthenticated && dbUser && (
          <Link to="/profile" style={{ 
            display: 'flex', alignItems: 'center', gap: '0.75rem', 
            paddingLeft: '1.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)',
            textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
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
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{dbUser.role === 'admin' ? 'Admin' : 'Student'}</span>
            </div>
          </Link>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
        <Link to="/" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</Link>
        <Link to="/roadmaps" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}>Roadmaps</Link>
        
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
              paddingBottom: '0.25rem',
              whiteSpace: 'nowrap'
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem', flexShrink: 0 }}>
          {isAuthenticated ? (
            <>
              {dbUser?.role === 'admin' && (
                <button 
                  onClick={() => setShowAddAdmin(true)}
                  style={{ 
                    background: 'transparent', border: '1px solid rgba(190, 242, 100, 0.3)', color: '#bef264', 
                    padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(190, 242, 100, 0.1)';
                    e.currentTarget.style.border = '1px solid rgba(190, 242, 100, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.border = '1px solid rgba(190, 242, 100, 0.3)';
                  }}
                >
                  Add Admin
                  <UserPlus size={16} />
                </button>
              )}
              <button 
                onClick={handleSignOut}
                style={{ 
                  background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', 
                  padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
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
            </>
          ) : (
            <Link 
              to="/login" 
              style={{ 
                color: '#cbd5e1', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
                padding: '0.5rem 1rem', transition: 'color 0.2s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#cbd5e1'}
            >
              Sign In
            </Link>
          )}
          <Link to="/assessment" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Analyze Now</Link>
        </div>
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {showAddAdmin && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                padding: '2rem', borderRadius: '12px', width: '400px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Add New Admin</h3>
                <button onClick={() => setShowAddAdmin(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Name</label>
                  <input 
                    type="text" required
                    value={adminForm.name} onChange={e => setAdminForm({...adminForm, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Email</label>
                  <input 
                    type="email" required
                    value={adminForm.email} onChange={e => setAdminForm({...adminForm, email: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Password</label>
                  <input 
                    type="password" required
                    value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
                  />
                </div>
                
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                  Create Admin Account
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
