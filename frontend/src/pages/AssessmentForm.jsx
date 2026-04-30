import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Briefcase, Award } from 'lucide-react';

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cgpa: '',
    dsaSolved: '',
    devProjects: '',
    internships: '',
    certifications: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/test', { state: { profileData: formData } });
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '2.5rem' }}>
      <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: 'var(--accent-primary)' }}>
        <Icon size={24} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{title}</h2>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: '800px', margin: '3rem auto 5rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Profile Analysis Engine</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Enter your accurate details below to map out your personalized placement strategy.</p>
      </div>

      <form className="glass-panel" onSubmit={handleSubmit} style={{ padding: '3rem' }}>
        
        {/* Academic Section */}
        <SectionHeader icon={BookOpen} title="Academics" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-group">
            <label className="form-label">Current CGPA (Out of 10)</label>
            <input 
              type="number" 
              step="0.01" 
              name="cgpa" 
              min="0" max="10"
              required 
              className="form-input" 
              placeholder="e.g. 8.5"
              value={formData.cgpa}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Coding & DSA Section */}
        <SectionHeader icon={Code} title="Problem Solving & Data Structures" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-group">
            <label className="form-label">Total Problems Solved (Leetcode/GFG)</label>
            <input 
              type="number" 
              name="dsaSolved" 
              required 
              className="form-input" 
              placeholder="e.g. 350"
              value={formData.dsaSolved}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Development Projects Count</label>
            <input 
              type="number" 
              name="devProjects" 
              required 
              className="form-input" 
              placeholder="e.g. 3"
              value={formData.devProjects}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Experience Section */}
        <SectionHeader icon={Briefcase} title="Industry Experience" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-group">
            <label className="form-label">Number of Internships</label>
            <select name="internships" className="form-select" required value={formData.internships} onChange={handleChange}>
              <option value="" disabled>Select count</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        {/* Certifications Section */}
        <SectionHeader icon={Award} title="Achievements & Certifications" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-group">
            <label className="form-label">Relevant Certifications / Courses</label>
            <select name="certifications" className="form-select" required value={formData.certifications} onChange={handleChange}>
              <option value="" disabled>Select count</option>
              <option value="0">None</option>
              <option value="1">1-2</option>
              <option value="2">3+</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem' }}>
            Proceed to Technical Test
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AssessmentForm;
