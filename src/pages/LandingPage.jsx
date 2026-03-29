import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, ChevronRight } from 'lucide-react';

// --- DATA STRUCTURES ---

const trendingTopics = ['Logical Reasoning', 'TCS Interview Questions', 'Zoho', 'Python MCQs', 'DSA', 'Wipro prep'];

const essentialsTabs = ['Aptitude', 'Programming', 'Company Specific', 'Resources'];

const aptitudeCategories = [
  'Quantitative Aptitude', 'Logical Reasoning', 'Data Interpretation', 
  'Verbal Ability', 'Non Verbal Reasoning'
];

const quantTopics = {
  'Quantitative Aptitude': ['Ages', 'Percentages', 'Averages', 'Profit and Loss', 'Time and Work'],
  'Logical Reasoning': ['Blood Relations', 'Direction Sense', 'Coding-Decoding', 'Number Series', 'Syllogism'],
  'Data Interpretation': ['Bar Graphs', 'Line Charts', 'Pie Charts', 'Tabular Data', 'Radar Graphs'],
  'Verbal Ability': ['Synonyms', 'Antonyms', 'Sentence Reading', 'Comprehension', 'Error Spotting'],
  'Non Verbal Reasoning': ['Cubes and Dice', 'Mirror Images', 'Water Images', 'Pattern Completion', 'Paper Folding']
};

const progCategories = [
  'Data Structures', 'Algorithms', 'Core Subjects', 'Web Development', 'Databases'
];

const progTopics = {
  'Data Structures': ['Arrays', 'Linked Lists', 'Stacks', 'Trees', 'Graphs'],
  'Algorithms': ['Sorting', 'Searching', 'Dynamic Programming', 'Greedy', 'Backtracking'],
  'Core Subjects': ['Operating Systems', 'Computer Networks', 'DBMS', 'OOPS', 'Software Engineering'],
  'Web Development': ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'System Design'],
  'Databases': ['SQL Constraints', 'Joins', 'Normalization', 'NoSQL', 'Transactions']
};

const companyCategories = [
  'Product Based (FAANG)', 'Service Based', 'Startups/Unicorns'
];

const companyTopics = {
  'Product Based (FAANG)': ['Google', 'Amazon', 'Microsoft', 'Apple', 'Netflix'],
  'Service Based': ['TCS Ninja', 'Infosys', 'Capgemini', 'Wipro WILP', 'Cognizant GenC'],
  'Startups/Unicorns': ['Zoho', 'Zerodha', 'Cure.fit', 'Razorpay', 'Swiggy']
};

const resourceCategories = [
  'Coding Platforms', 'Video Channels', 'Mock Exams', 'Syllabus Roadmaps'
];

const resourceTopics = {
  'Coding Platforms': [
    { name: 'LeetCode', url: 'https://leetcode.com', external: true },
    { name: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org', external: true },
    { name: 'HackerRank', url: 'https://www.hackerrank.com', external: true },
    { name: 'Codeforces', url: 'https://codeforces.com', external: true },
    { name: 'Coding Ninjas', url: 'https://www.codingninjas.com', external: true }
  ],
  'Video Channels': [
    { name: 'TakeUForward', url: 'https://www.youtube.com/@takeUforward', external: true },
    { name: 'NeetCode', url: 'https://www.youtube.com/@NeetCode', external: true },
    { name: 'freeCodeCamp', url: 'https://www.youtube.com/@freecodecamp', external: true },
    { name: 'CS50', url: 'https://www.youtube.com/@cs50', external: true },
    { name: 'William Fiset', url: 'https://www.youtube.com/@WilliamFiset-videos', external: true }
  ],
  'Mock Exams': [
    { name: 'Aptitude Mock Test', url: '/practice/Aptitude', external: false },
    { name: 'DSA Final Exam', url: '/test', external: false },
    { name: 'Core Computing Mock', url: '/practice/OS', external: false },
    { name: 'Logical Reasoning Mock', url: '/practice/Verbal', external: false },
    { name: 'Full System Mock', url: '/test', external: false }
  ],
  'Syllabus Roadmaps': [
    { name: 'Data Structures Roadmap', url: '/roadmaps', external: false, state: { focusSubject: 'DSA' } },
    { name: 'Operating Systems', url: '/roadmaps', external: false, state: { focusSubject: 'OS' } },
    { name: 'Computer Networks', url: '/roadmaps', external: false, state: { focusSubject: 'CN' } },
    { name: 'DBMS Design', url: '/roadmaps', external: false, state: { focusSubject: 'DBMS' } },
    { name: 'System Design Patterns', url: '/roadmaps', external: false, state: { focusSubject: 'OOPS' } }
  ]
};

const companyMarquee1 = [
  { name: 'Infosys', color: '#0f76bc' }, { name: 'Capgemini', color: '#0070ad' }, 
  { name: 'Accenture', color: '#a100ff' }, { name: 'Deloitte', color: '#86bc25' }, 
  { name: 'MulticoreWare', color: '#2563eb' }, { name: 'Wipro WILP', color: '#0ea5e9' },
  { name: 'Zoho', color: '#16a34a' }, { name: 'Cognizant GenC', color: '#0033a0' },
  { name: 'TCS Ninja', color: '#e7152b' }
];

const companyMarquee2 = [
  { name: 'Wipro WILP', color: '#0ea5e9' }, { name: 'Accenture', color: '#a100ff' }, 
  { name: 'Cognizant GenC', color: '#0033a0' }, { name: 'Deloitte', color: '#86bc25' }, 
  { name: 'Capgemini', color: '#0070ad' }, { name: 'Zoho', color: '#16a34a' },
  { name: 'TCS Digital', color: '#e7152b' }, { name: 'Cognizant GenC Next', color: '#0033a0' },
  { name: 'TCS NQT', color: '#e7152b' }
];

const faqData = [
  { question: 'Is PlaceReady completely free to use?', answer: 'Yes! Our fundamental mission is to provide premium placement preparation without aggressive paywalls.' },
  { question: 'How is the Placement Readiness Score calculated?', answer: 'Your score leverages an algorithm analyzing your mock test performances, technical proficiency, and historical problem-solving metrics.' },
  { question: 'Can I contribute specific interview questions?', answer: 'Absolutely. Navigating to the Company Prep section allows you to submit recent interview questions which are curated directly into the database.' },
  { question: 'Are the roadmaps updated for 2026?', answer: 'Yes, all syllabus roadmaps and company specific domains are constantly iterated to match current industry trends and massive hiring shifts.' }
];

// --- COMPONENT ---

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopTab, setActiveTopTab] = useState('Aptitude');
  const [activeSideTab, setActiveSideTab] = useState('Quantitative Aptitude');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const smartNavigate = (rawQuery) => {
    const query = rawQuery.trim().toLowerCase();
    if (!query) return;

    // 1. Check if the query matches a Company name
    const allKnownCompanies = [...companyMarquee1, ...companyMarquee2].map(c => c.name);
    let matchedCompany = allKnownCompanies.find(c => c.toLowerCase().includes(query) || query.includes(c.toLowerCase()));
    
    // Also check localStorage for newly contributed custom companies
    const storedData = localStorage.getItem('companyQuestions');
    if (storedData && !matchedCompany) {
       const parsed = JSON.parse(storedData);
       const found = parsed.find(c => c.name.toLowerCase().includes(query) || query.includes(c.name.toLowerCase()));
       if (found) matchedCompany = found.name;
    }

    if (matchedCompany) {
        navigate('/company-prep', { state: { focusCompany: matchedCompany } });
        return;
    }

    // 2. Check if the query matches a Subject Roadmap
    const subjectMap = {
      'os': 'OS', 'operating': 'OS', 'system': 'OS',
      'cn': 'CN', 'network': 'CN',
      'dbms': 'DBMS', 'database': 'DBMS', 'sql': 'DBMS',
      'oop': 'OOPS', 'object': 'OOPS',
      'dsa': 'DSA', 'data structure': 'DSA', 'algorithm': 'DSA', 'coding': 'DSA'
    };

    let mappedSubject = null;
    for (const [key, val] of Object.entries(subjectMap)) {
      if (query.includes(key)) {
         mappedSubject = val;
         break;
      }
    }

    if (mappedSubject) {
       navigate('/roadmaps', { state: { focusSubject: mappedSubject } });
       return;
    }

    // Default fallback to DSA if nothing specific is found
    navigate(`/roadmaps`, { state: { focusSubject: 'DSA' } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    smartNavigate(searchQuery);
  };

  const getActiveCategories = () => {
    switch(activeTopTab) {
      case 'Aptitude': return aptitudeCategories;
      case 'Programming': return progCategories;
      case 'Company Specific': return companyCategories;
      case 'Resources': return resourceCategories;
      default: return aptitudeCategories;
    }
  };

  const getActiveTopics = () => {
    switch(activeTopTab) {
      case 'Aptitude': return quantTopics[activeSideTab] || quantTopics['Quantitative Aptitude'];
      case 'Programming': return progTopics[activeSideTab] || progTopics['Data Structures'];
      case 'Company Specific': return companyTopics[activeSideTab] || companyTopics['Product Based (FAANG)'];
      case 'Resources': return resourceTopics[activeSideTab] || resourceTopics['Coding Platforms'];
      default: return [];
    }
  };

  return (
    <div style={{ paddingBottom: '5rem', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '80vh', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: '0 2rem', position: 'relative'
      }}>
        {/* Abstract Background Grid Simulation */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(190, 242, 100, 0.05) 0%, transparent 70%)',
          zIndex: -1, pointerEvents: 'none'
        }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto 3rem' }}>
            <span style={{ color: '#bef264' }}>Master the skills</span> <span style={{ color: '#e2e8f0' }}>that matter and unlock your true potential.</span>
          </h1>

          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%', maxWidth: '750px', margin: '0 auto 3rem', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.5rem', color: 'var(--text-muted)' }}>
              <Search size={24} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search aptitude, coding, companies, or more..."
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '1.5rem 0', outline: 'none' }}
            />
            <button type="submit" style={{ background: '#bef264', color: '#0f172a', fontWeight: 600, fontSize: '1.1rem', padding: '0 2.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#d9f99d'} onMouseLeave={e => e.target.style.background = '#bef264'}>
              Search
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, marginRight: '1rem' }}>
               <TrendingUp size={20} />
               <span>Trending</span>
             </div>
             {trendingTopics.map(topic => (
               <button 
                 key={topic} 
                 onClick={() => smartNavigate(topic)}
                 style={{ 
                   background: '#1e293b', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.05)', 
                   padding: '0.6rem 1.25rem', borderRadius: '30px', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' 
                 }}
                 onMouseEnter={e => { e.target.style.background = '#334155'; e.target.style.color = '#fff'; }}
                 onMouseLeave={e => { e.target.style.background = '#1e293b'; e.target.style.color = '#cbd5e1'; }}
               >
                 {topic}
               </button>
             ))}
          </div>
        </motion.div>
      </section>

      {/* 2. PLACEMENT ESSENTIALS */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Placement Essentials</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Start preparing with our unique features a process designed to help you land a job at top companies!</p>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Top Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem' }}>
            {essentialsTabs.map(tab => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTopTab(tab);
                  if (tab === 'Aptitude') setActiveSideTab(aptitudeCategories[0]);
                  if (tab === 'Programming') setActiveSideTab(progCategories[0]);
                  if (tab === 'Company Specific') setActiveSideTab(companyCategories[0]);
                  if (tab === 'Resources') setActiveSideTab(resourceCategories[0]);
                }}
                style={{
                  flex: 1, padding: '1.5rem', background: 'transparent', border: 'none', borderBottom: activeTopTab === tab ? '3px solid #bef264' : '3px solid transparent',
                  color: activeTopTab === tab ? '#bef264' : '#94a3b8', fontSize: '1.25rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Two-Column Explorer */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem', minHeight: '500px' }}>
            
            {/* Left Vertical Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.4)' }}>
              {getActiveCategories().map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveSideTab(cat)}
                  style={{
                    padding: '1.25rem', textAlign: 'left', background: activeSideTab === cat ? 'linear-gradient(90deg, #f1f5f9 0%, #cbd5e1 100%)' : 'transparent',
                    color: activeSideTab === cat ? '#0f172a' : '#94a3b8', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: activeSideTab === cat ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { if(activeSideTab !== cat) e.target.style.color = '#fff' }}
                  onMouseLeave={e => { if(activeSideTab !== cat) e.target.style.color = '#94a3b8' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Logic Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignContent: 'start' }}>
               {getActiveTopics().map((topic, index) => {
                 const isObject = typeof topic === 'object';
                 const label = isObject ? topic.name : topic;
                 
                 let handleClick = () => navigate(`/quiz/${encodeURIComponent(topic)}`);
                 let displayLabel = `${label} Assessment (5 Questions)`;

                 if (activeTopTab === 'Company Specific') {
                   handleClick = () => navigate('/company-prep', { state: { focusCompany: label } });
                   displayLabel = `${label} Interview Prep`;
                 } else if (activeTopTab === 'Resources') {
                   handleClick = () => {
                     if (topic.external) {
                       window.open(topic.url, '_blank');
                     } else {
                       navigate(topic.url, topic.state ? { state: topic.state } : {});
                     }
                   };
                   displayLabel = label;
                 }

                 return (
                   <button
                     key={index}
                     onClick={handleClick}
                     style={{
                       background: 'rgba(255,255,255,0.02)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)',
                       padding: '1.5rem 1rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer',
                       display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transition: 'all 0.2s', width: '100%'
                     }}
                     onMouseEnter={e => { e.currentTarget.style.borderColor = '#bef264'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                     onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(0)' }}
                   >
                     {displayLabel}
                   </button>
                 );
               })}
            </div>

          </div>
        </div>
      </section>



      {/* 3. FAQ SECTION */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Everything you need to know about the platform.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqData.map((faq, index) => {
               const isOpen = openFaqIndex === index;
               return (
                 <div key={index} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: '#1e293b', overflow: 'hidden', transition: 'all 0.3s' }}>
                   <button 
                     onClick={() => toggleFaq(index)}
                     style={{ 
                       width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                       background: 'transparent', border: 'none', color: isOpen ? '#bef264' : '#fff', fontSize: '1.15rem', 
                       fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s' 
                     }}
                   >
                     <span>{faq.question}</span>
                     <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ color: 'var(--text-muted)' }}>
                       <ChevronRight size={20} />
                     </motion.div>
                   </button>
                   <AnimatePresence>
                     {isOpen && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }} 
                         animate={{ height: 'auto', opacity: 1 }} 
                         exit={{ height: 0, opacity: 0 }} 
                         transition={{ duration: 0.2 }}
                         style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}
                       >
                         {faq.answer}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
