import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Target, ArrowRight, LogOut, UserPlus, UserMinus, ChevronDown, X } from 'lucide-react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showDeleteAdmin, setShowDeleteAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });
  const [deleteEmail, setDeleteEmail] = useState('');
  const [dbUser, setDbUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsUserMenuOpen(false);
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

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/delete-admin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: deleteEmail })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Admin deleted successfully!');
        setShowDeleteAdmin(false);
        setDeleteEmail('');
      } else {
        alert(data.error || 'Failed to delete admin');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginBottom: '0.4rem',
    fontWeight: 500
  };

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      gap: '1rem',
      flexWrap: 'nowrap',
    }}>
      {/* LEFT: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <Target className="text-gradient" size={28} />
          <span>Place<span className="text-gradient">Ready</span></span>
        </Link>
      </div>

      {/* CENTER: Nav Links */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Link to="/" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}>Home</Link>
        <Link to="/roadmaps" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}>Roadmaps</Link>
        <Link to="/coding-challenges" className="text-muted" style={{ fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' }}>Coding</Link>

        {/* Company Prep with Mega Menu */}
        <div
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
          style={{ position: 'relative', padding: '1.5rem 0' }}
        >
          <Link
            to="/company-prep"
            className="text-muted"
            style={{
              fontWeight: 500,
              color: isMegaMenuOpen ? '#fff' : 'inherit',
              transition: 'color 0.2s',
              textDecoration: 'none',
              borderBottom: isMegaMenuOpen ? '2px solid #bef264' : 'none',
              paddingBottom: '0.25rem',
              whiteSpace: 'nowrap'
            }}
          >
            Company Specific
          </Link>

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
                  width: '900px',
                  background: 'rgba(15, 23, 42, 0.95)',
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
                <div style={{ position: 'absolute', left: '50%', top: '2.5rem', bottom: '2.5rem', width: '1px', background: 'rgba(255,255,255,0.08)' }}></div>

                <div style={{ paddingRight: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => navigate('/practice/Aptitude')}
                    style={{ background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '4px', alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.95rem', marginBottom: '2rem', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.target.style.background = '#000'}
                  >
                    Aptitude Questions
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', rowGap: '1.25rem' }}>
                    {aptitudeCompanies.map(company => (
                      <Link key={company} to="/company-prep" state={{ focusCompany: company }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {company}
                      </Link>
                    ))}
                  </div>
                  <Link to="/company-prep" style={{ color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, marginTop: '2.5rem' }}>
                    View All <ArrowRight size={16} />
                  </Link>
                </div>

                <div style={{ paddingLeft: '3rem', display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => navigate('/company-prep')}
                    style={{ background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '4px', alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.95rem', marginBottom: '2rem', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.target.style.background = '#000'}
                  >
                    Placement Exams
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', rowGap: '1.25rem' }}>
                    {placementExams.map(exam => (
                      <Link key={exam} to="/company-prep" state={{ focusCompany: exam }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
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
      </div>

      {/* RIGHT: User & CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {isAuthenticated && dbUser ? (
          /* User Avatar + Dropdown trigger */
          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '0.4rem 0.75rem 0.4rem 0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              {/* Avatar circle */}
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, color: '#0f172a', flexShrink: 0
              }}>
                {dbUser.name.charAt(0).toUpperCase()}
              </div>

              {/* Name + Role */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.2 }}>{dbUser.name}</span>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                  color: dbUser.role === 'admin' ? '#bef264' : '#94a3b8'
                }}>
                  {dbUser.role === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>

              {/* Chevron */}
              <ChevronDown
                size={16}
                color="#94a3b8"
                style={{ transition: 'transform 0.2s', transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '200px',
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                    zIndex: 60
                  }}
                >
                  {/* Profile link */}
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.9rem 1.1rem',
                      textDecoration: 'none',
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    View Profile
                  </Link>

                  {/* Admin-only options */}
                  {dbUser.role === 'admin' && (
                    <>
                      <button
                        onClick={() => { setIsUserMenuOpen(false); setShowAddAdmin(true); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.9rem 1.1rem', background: 'transparent', border: 'none',
                          color: '#bef264', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(190,242,100,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <UserPlus size={16} /> Add Admin
                      </button>
                      <button
                        onClick={() => { setIsUserMenuOpen(false); setShowDeleteAdmin(true); }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.9rem 1.1rem', background: 'transparent', border: 'none',
                          color: '#f97316', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left',
                          borderBottom: '1px solid rgba(255,255,255,0.07)',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <UserMinus size={16} /> Delete Admin
                      </button>
                    </>
                  )}

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.9rem 1.1rem', background: 'transparent', border: 'none',
                      color: '#ef4444', fontSize: '0.9rem', cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
        <Link to="/assessment" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Analyze Now
        </Link>
      </div>

      {/* ── Add Admin Modal ── */}
      <AnimatePresence>
        {showAddAdmin && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '16px', width: '420px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserPlus size={20} color="#bef264" /> Add New Admin
                </h3>
                <button onClick={() => setShowAddAdmin(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div><label style={labelStyle}>Name</label><input type="text" required value={adminForm.name} onChange={e => setAdminForm({ ...adminForm, name: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>Email</label><input type="email" required value={adminForm.email} onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>Password</label><input type="password" required value={adminForm.password} onChange={e => setAdminForm({ ...adminForm, password: e.target.value })} style={inputStyle} /></div>
                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px' }}>Create Admin Account</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Admin Modal ── */}
      <AnimatePresence>
        {showDeleteAdmin && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '16px', width: '420px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserMinus size={20} color="#f97316" /> Delete Admin
                </h3>
                <button onClick={() => setShowDeleteAdmin(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Enter the email address of the admin you want to remove. This action cannot be undone.</p>
              <form onSubmit={handleDeleteAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div><label style={labelStyle}>Admin Email</label><input type="email" required value={deleteEmail} onChange={e => setDeleteEmail(e.target.value)} style={inputStyle} placeholder="admin@example.com" /></div>
                <button type="submit" style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '8px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>Delete Admin</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
