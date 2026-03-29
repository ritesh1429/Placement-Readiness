import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, ArrowLeft, Lightbulb, TrendingUp } from 'lucide-react';
import { defaultCompanyQuestions } from '../data/companyQuestions';

const CompanyPrep = () => {
  const [activeCompany, setActiveCompany] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  
  // Question Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ type: '', difficulty: 'Medium', question: '', hint: '' });

  // Company Form State
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', color: '#3b82f6' });

  const location = useLocation();

  // Load from localStorage or use defaults
  useEffect(() => {
    const storedData = localStorage.getItem('companyQuestions');
    let loadedData = defaultCompanyQuestions;
    if (storedData) {
      loadedData = JSON.parse(storedData);
    }
    setCompanyData(loadedData);

    // Auto-focus company if routed from Search or Mega Menu
    if (location.state?.focusCompany) {
      const target = loadedData.find(c => c.name.toLowerCase() === location.state.focusCompany.toLowerCase());
      if (target) {
        setActiveCompany(target);
      }
    } else {
      setActiveCompany(null);
    }
  }, [location.state]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question.trim() || !newQuestion.type.trim()) return;

    const updatedData = companyData.map(c => {
      if (c.id === activeCompany.id) {
        return {
          ...c,
          questions: [
            ...c.questions,
            { ...newQuestion, id: `custom_${Date.now()}` }
          ]
        };
      }
      return c;
    });

    setCompanyData(updatedData);
    localStorage.setItem('companyQuestions', JSON.stringify(updatedData));
    
    // Update active view
    setActiveCompany(updatedData.find(c => c.id === activeCompany.id));
    
    setNewQuestion({ type: '', difficulty: 'Medium', question: '', hint: '' });
    setShowAddForm(false);
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!newCompany.name.trim()) return;

    const newCompanyObj = {
      id: `company_${Date.now()}`,
      name: newCompany.name,
      logo: '', // Generic fallback or no icon
      color: newCompany.color,
      questions: []
    };

    const updatedData = [...companyData, newCompanyObj];
    setCompanyData(updatedData);
    localStorage.setItem('companyQuestions', JSON.stringify(updatedData));
    
    setNewCompany({ name: '', color: '#3b82f6' });
    setShowAddCompany(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '1100px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Company Interview Prep</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Explore top historically asked questions from major tech giants, and contribute your own!</p>
      </div>

      {!activeCompany ? (
        // --- GRID VIEW ---
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
            <button 
              onClick={() => setShowAddCompany(!showAddCompany)}
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {showAddCompany ? 'Cancel' : <><Plus size={18} /> Add New Company</>}
            </button>
          </div>

          <AnimatePresence>
            {showAddCompany && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                style={{ overflow: 'hidden', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                onSubmit={handleAddCompany}
              >
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Create a Company Profile</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                   <div className="form-group">
                     <label className="form-label">Company Name</label>
                     <input type="text" className="form-input" required value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} placeholder="e.g., Netflix, Uber" />
                   </div>
                   <div className="form-group">
                     <label className="form-label">Brand Color</label>
                     <input type="color" className="form-input" style={{ padding: '0.25rem', height: '48px', cursor: 'pointer' }} value={newCompany.color} onChange={e => setNewCompany({...newCompany, color: e.target.value})} />
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <button type="submit" className="btn-primary">Add Company</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {companyData.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setActiveCompany(company)}
              className="glass-panel"
              style={{
                padding: '2.5rem 1.5rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s',
                borderTop: `4px solid ${company.color}`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
               <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '1rem 0' }}>{company.name}</h2>
               <p style={{ color: 'var(--text-secondary)' }}>{company.questions.length} Practice Questions</p>
            </motion.div>
          ))}
          </div>
        </div>
      ) : (
        // --- DETAILED VIEW ---
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ width: '100%' }}
        >
          <button 
            onClick={() => setActiveCompany(null)} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem' }}
          >
            <ArrowLeft size={18} /> Back to Companies
          </button>

          <div className="glass-panel" style={{ padding: '3rem', borderTop: `6px solid ${activeCompany.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
               <div>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{activeCompany.name} Questions</h2>
                 <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>A curated list of recently asked interview questions.</p>
               </div>
               <button 
                 onClick={() => setShowAddForm(!showAddForm)}
                 className="btn-primary" 
                 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeCompany.color, border: `1px solid ${activeCompany.color}` }}
               >
                 {showAddForm ? 'Cancel' : <><Plus size={18} /> Contribute Question</>}
               </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }} 
                  style={{ overflow: 'hidden', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}
                  onSubmit={handleAddQuestion}
                >
                  <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Add a New {activeCompany.name} Question</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                     <div className="form-group">
                       <label className="form-label">Topic/Category (e.g. DSA, Arrays)</label>
                       <input type="text" className="form-input" required value={newQuestion.type} onChange={e => setNewQuestion({...newQuestion, type: e.target.value})} placeholder="Graphs" />
                     </div>
                     <div className="form-group">
                       <label className="form-label">Difficulty</label>
                       <select className="form-select" value={newQuestion.difficulty} onChange={e => setNewQuestion({...newQuestion, difficulty: e.target.value})}>
                         <option>Easy</option>
                         <option>Medium</option>
                         <option>Hard</option>
                       </select>
                     </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">The Main Question</label>
                    <textarea required className="form-input" rows="3" value={newQuestion.question} onChange={e => setNewQuestion({...newQuestion, question: e.target.value})} placeholder="E.g., Design a concurrent Hash Map..."></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Hint or Solution Strategy</label>
                    <input type="text" className="form-input" value={newQuestion.hint} onChange={e => setNewQuestion({...newQuestion, hint: e.target.value})} placeholder="E.g., Use granular region locks instead of a global lock." />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                     <button type="submit" className="btn-primary" style={{ background: activeCompany.color, borderColor: activeCompany.color }}>Save Question to List</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activeCompany.questions.map((q, idx) => (
                <div key={q.id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${q.difficulty === 'Hard' ? '#ef4444' : q.difficulty === 'Medium' ? '#f59e0b' : '#10b981'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-secondary)' }}>{q.type}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: q.difficulty === 'Hard' ? '#ef4444' : q.difficulty === 'Medium' ? '#f59e0b' : '#10b981' }}>{q.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.5, marginBottom: '1rem' }}>{q.question}</h3>
                  {q.hint && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '6px' }}>
                      <Lightbulb size={20} color="var(--accent-primary)" style={{ marginTop: '0.1rem' }} />
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{q.hint}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {activeCompany.questions.length === 0 && (
              <p className="text-muted" style={{ textAlign: 'center', marginTop: '3rem' }}>No questions available yet. Be the first to contribute!</p>
            )}

          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompanyPrep;
