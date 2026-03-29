import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Mail, Lock, User } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || 'Authentication failed');
        return;
      }

      // Store real token and establish verified session
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      alert('Network error. Is the backend running?');
    }
  };

  const handleSocialLogin = () => {
    // Mock Google/Github OAuth routing
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' 
    }}>
      {/* Abstract Background Effects */}
      <div style={{
        position: 'absolute', top: '10%', right: '15%',
        width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(190, 242, 100, 0.08) 0%, transparent 70%)',
        zIndex: -1, pointerEvents: 'none', filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '15%',
        width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
        zIndex: -1, pointerEvents: 'none', filter: 'blur(40px)'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <div className="glass-panel" style={{ padding: '3rem 2rem', borderTop: '4px solid #bef264' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(190, 242, 100, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <Target size={32} color="#bef264" />
              </div>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start your placement preparation journey.'}
            </p>
          </div>

          {/* Social Logins */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
             <button 
               onClick={handleSocialLogin}
               style={{ 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%',
                 padding: '0.875rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                 borderRadius: '8px', color: '#fff', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' 
               }}
               onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
               onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
             >
               <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
               Continue with Google
             </button>
             <button 
               onClick={handleSocialLogin}
               style={{ 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%',
                 padding: '0.875rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                 borderRadius: '8px', color: '#fff', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' 
               }}
               onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
               onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
             >
               <svg style={{ width: 22, height: 22 }} viewBox="0 0 24 24">
                 <path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
               </svg>
               Continue with Github
             </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Or continue with email</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <User size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required={!isLogin}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ 
                        width: '100%', padding: '1rem 1rem 1rem 3rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none'
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ 
                  width: '100%', padding: '1rem 1rem 1rem 3rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none'
                }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                style={{ 
                  width: '100%', padding: '1rem 1rem 1rem 3rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none'
                }}
              />
            </div>

            {isLogin && <div style={{ textAlign: 'right' }}><a href="#" style={{ color: '#bef264', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot password?</a></div>}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle View */}
          <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'transparent', border: 'none', color: '#bef264', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '1rem' }}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
