import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AssessmentForm from './pages/AssessmentForm';
import TechnicalTest from './pages/TechnicalTest';
import PracticeTest from './pages/PracticeTest';
import ResultsDashboard from './pages/ResultsDashboard';
import SubjectRoadmap from './pages/SubjectRoadmap';
import CompanyPrep from './pages/CompanyPrep';
import TopicQuiz from './pages/TopicQuiz';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        
        <main style={{ paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assessment" element={<AssessmentForm />} />
            <Route path="/test" element={<TechnicalTest />} />
            <Route path="/practice/:subjectId" element={<PracticeTest />} />
            <Route path="/quiz/:topicId" element={<TopicQuiz />} />
            <Route path="/dashboard" element={<ResultsDashboard />} />
            <Route path="/roadmaps" element={<SubjectRoadmap />} />
            <Route path="/company-prep" element={<CompanyPrep />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
