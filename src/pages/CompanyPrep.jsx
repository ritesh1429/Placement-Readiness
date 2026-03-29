import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Plus, ArrowLeft, Lightbulb, ExternalLink,
  Map, BookOpen, HelpCircle, CheckCircle2, Zap
} from 'lucide-react';
import { defaultCompanyQuestions } from '../data/companyQuestions';

// ─── Detail Tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { key: 'questions', label: 'Practice Questions', icon: HelpCircle },
  { key: 'roadmap',   label: 'Prep Roadmap',       icon: Map },
  { key: 'resources', label: 'Resources',           icon: BookOpen },
];

const CompanyPrep = () => {
  const [activeCompany, setActiveCompany] = useState(null);
  const [companyData, setCompanyData]     = useState([]);
  const [activeTab, setActiveTab]         = useState('questions');

  // Question Form State
  const [showAddForm, setShowAddForm]   = useState(false);
  const [newQuestion, setNewQuestion]   = useState({ type: '', difficulty: 'Medium', question: '', hint: '' });

  // Company Form State
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompany, setNewCompany]         = useState({ name: '', color: '#3b82f6' });

  const location = useLocation();

  // Load from localStorage or use defaults
  useEffect(() => {
    const storedData = localStorage.getItem('companyQuestions');
    // Merge: always include default companies, then overlay any custom additions
    let loadedData = defaultCompanyQuestions;
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Keep defaults fresh; merge extra user-added companies
      const defaultIds = new Set(defaultCompanyQuestions.map(c => c.id));
      const customOnly = parsed.filter(c => !defaultIds.has(c.id));
      loadedData = [...defaultCompanyQuestions, ...customOnly];
    }
    setCompanyData(loadedData);

    if (location.state?.focusCompany) {
      const target = loadedData.find(
        c => c.name.toLowerCase() === location.state.focusCompany.toLowerCase()
      );
      if (target) { setActiveCompany(target); setActiveTab('questions'); }
    } else {
      setActiveCompany(null);
    }
  }, [location.state]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question.trim() || !newQuestion.type.trim()) return;

    const updatedData = companyData.map(c => {
      if (c.id === activeCompany.id) {
        return { ...c, questions: [...c.questions, { ...newQuestion, id: `custom_${Date.now()}` }] };
      }
      return c;
    });

    setCompanyData(updatedData);
    localStorage.setItem('companyQuestions', JSON.stringify(updatedData));
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
      logo: '',
      color: newCompany.color,
      roadmap: null,
      resources: [],
      questions: []
    };

    const updatedData = [...companyData, newCompanyObj];
    setCompanyData(updatedData);
    localStorage.setItem('companyQuestions', JSON.stringify(updatedData));
    setNewCompany({ name: '', color: '#3b82f6' });
    setShowAddCompany(false);
  };

  // ─── Sub-views ──────────────────────────────────────────────────────────────
  const renderQuestions = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Add Question Form */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
            onSubmit={handleAddQuestion}
          >
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Add a New {activeCompany.name} Question</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Topic/Category (e.g. DSA, Arrays)</label>
                <input type="text" className="form-input" required value={newQuestion.type} onChange={e => setNewQuestion({ ...newQuestion, type: e.target.value })} placeholder="Aptitude" />
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-select" value={newQuestion.difficulty} onChange={e => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}>
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">The Main Question</label>
              <textarea required className="form-input" rows="3" value={newQuestion.question} onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })} placeholder="E.g., What is the time complexity of..."></textarea>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Hint or Solution Strategy</label>
              <input type="text" className="form-input" value={newQuestion.hint} onChange={e => setNewQuestion({ ...newQuestion, hint: e.target.value })} placeholder="E.g., Use a HashMap for O(N) lookup." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary" style={{ background: activeCompany.color, borderColor: activeCompany.color }}>Save Question</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {activeCompany.questions.length === 0 && (
        <p className="text-muted" style={{ textAlign: 'center', marginTop: '3rem' }}>No questions yet. Be the first to contribute!</p>
      )}

      {activeCompany.questions.map((q, idx) => (
        <div key={q.id} style={{
          padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px',
          borderLeft: `3px solid ${q.difficulty === 'Hard' ? '#ef4444' : q.difficulty === 'Medium' ? '#f59e0b' : '#10b981'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', color: 'var(--text-secondary)' }}>{q.type}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: q.difficulty === 'Hard' ? '#ef4444' : q.difficulty === 'Medium' ? '#f59e0b' : '#10b981' }}>{q.difficulty}</span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1rem' }}>Q{idx + 1}. {q.question}</h3>
          {q.hint && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.9rem 1rem', background: 'rgba(59,130,246,0.08)', borderRadius: '6px' }}>
              <Lightbulb size={18} color="var(--accent-primary)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q.hint}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRoadmap = () => {
    if (!activeCompany.roadmap) return (
      <p className="text-muted" style={{ textAlign: 'center', marginTop: '3rem' }}>No roadmap added yet for this company.</p>
    );
    const { phases, tips } = activeCompany.roadmap;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Phases */}
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', borderLeft: `4px solid ${activeCompany.color}` }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: activeCompany.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{phase.title}</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {phase.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={16} color={activeCompany.color} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Tips */}
        {tips && tips.length > 0 && (
          <div style={{ padding: '1.5rem', background: 'rgba(190,242,100,0.05)', borderRadius: '12px', border: '1px solid rgba(190,242,100,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Zap size={18} color="#bef264" />
              <h4 style={{ margin: 0, color: '#bef264', fontSize: '1rem', fontWeight: 600 }}>Pro Tips</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {tips.map((tip, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.6 }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderResources = () => {
    if (!activeCompany.resources || activeCompany.resources.length === 0) return (
      <p className="text-muted" style={{ textAlign: 'center', marginTop: '3rem' }}>No resources added yet for this company.</p>
    );
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {activeCompany.resources.map((res, i) => (
          <motion.a
            key={i}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{
              display: 'block', padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', textDecoration: 'none',
              transition: 'all 0.2s', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = activeCompany.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4 }}>{res.name}</span>
              <ExternalLink size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: '0.5rem', marginTop: '0.2rem' }} />
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{res.description}</p>
          </motion.a>
        ))}
      </div>
    );
  };

  // ─── Main Render ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      style={{ maxWidth: '1100px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Company Interview Prep</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          Explore practice questions, prep roadmaps, and curated resources for top companies.
        </p>
      </div>

      {!activeCompany ? (
        // ── GRID VIEW ──────────────────────────────────────────────────────────
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
            <button onClick={() => setShowAddCompany(!showAddCompany)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {showAddCompany ? 'Cancel' : <><Plus size={18} /> Add New Company</>}
            </button>
          </div>

          <AnimatePresence>
            {showAddCompany && (
              <motion.form
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                onSubmit={handleAddCompany}
              >
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Create a Company Profile</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-input" required value={newCompany.name} onChange={e => setNewCompany({ ...newCompany, name: e.target.value })} placeholder="e.g., Netflix, Uber" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand Color</label>
                    <input type="color" className="form-input" style={{ padding: '0.25rem', height: '48px', cursor: 'pointer' }} value={newCompany.color} onChange={e => setNewCompany({ ...newCompany, color: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary">Add Company</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {companyData.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.06 }}
                onClick={() => { setActiveCompany(company); setActiveTab('questions'); }}
                className="glass-panel"
                style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', borderTop: `4px solid ${company.color}` }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0 0.75rem', textAlign: 'center' }}>{company.name}</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                    {company.questions.length} Questions
                  </span>
                  {company.roadmap && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                      Roadmap ✓
                    </span>
                  )}
                  {company.resources?.length > 0 && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                      {company.resources.length} Resources
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // ── DETAIL VIEW ────────────────────────────────────────────────────────
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%' }}>
          <button
            onClick={() => setActiveCompany(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem' }}
          >
            <ArrowLeft size={18} /> Back to Companies
          </button>

          <div className="glass-panel" style={{ padding: '2.5rem', borderTop: `6px solid ${activeCompany.color}` }}>
            {/* Company Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>{activeCompany.name}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', margin: '0.4rem 0 0' }}>
                  {activeCompany.questions.length} questions · {activeCompany.resources?.length || 0} resources
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {activeCompany.resources?.map((r, i) => (
                  i < 2 && (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: activeCompany.color, border: `1px solid ${activeCompany.color}30`, padding: '0.4rem 0.85rem', borderRadius: '20px', textDecoration: 'none', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = `${activeCompany.color}15`}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <ExternalLink size={12} /> {r.name}
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0' }}>
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setShowAddForm(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.75rem 1.25rem', background: 'transparent', border: 'none',
                      borderBottom: isActive ? `2px solid ${activeCompany.color}` : '2px solid transparent',
                      color: isActive ? '#e2e8f0' : 'var(--text-muted)',
                      fontSize: '0.95rem', fontWeight: isActive ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              >
                {activeTab === 'questions' && renderQuestions()}
                {activeTab === 'roadmap'   && renderRoadmap()}
                {activeTab === 'resources' && renderResources()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompanyPrep;
