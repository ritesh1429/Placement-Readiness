import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

// Mongoose Models
import User from './models/User.js';
import Assessment from './models/Assessment.js';
import Contribution from './models/Contribution.js';
import Company from './models/Company.js';
import codeRoutes from './routes/codeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_dev_key';

// Initialize Database Connection
connectDB();

app.use(cors());
app.use(express.json());

// --- Middleware: Verify Token ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
};

// --- AUTHENTICATION ROUTES ---

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const isValidPassword = password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: 'Password does not meet complexity requirements' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password_hash: passwordHash, role: 'user' });
    const token = jwt.sign({ id: newUser._id, email, name, role: newUser.role }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser._id, name, email, role: newUser.role } });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Logged in successfully', token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register-admin', authenticateToken, isAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({ name, email, password_hash: passwordHash, role: 'admin' });
    res.status(201).json({ message: 'Admin created successfully', user: { id: newAdmin._id, name, email, role: newAdmin.role } });
  } catch (error) {
    console.error('Admin Registration Error:', error);
    res.status(500).json({ error: 'Server error during admin registration' });
  }
});

app.delete('/api/auth/delete-admin', authenticateToken, isAdmin, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Prevent self-deletion
    if (email === req.user.email) {
      return res.status(403).json({ error: 'You cannot delete your own admin account' });
    }
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) return res.status(404).json({ error: 'Admin not found with that email' });

    await User.deleteOne({ email, role: 'admin' });
    res.json({ message: `Admin ${email} deleted successfully` });
  } catch (error) {
    console.error('Admin Delete Error:', error);
    res.status(500).json({ error: 'Server error during admin deletion' });
  }
});

// --- ASSESSMENT ROUTES ---

app.post('/api/assessments', authenticateToken, async (req, res) => {
  const { test_type, subject, score, total } = req.body;
  if (!test_type || !subject || score === undefined || !total) {
    return res.status(400).json({ error: 'Missing assessment data components' });
  }
  try {
    const newAssessment = await Assessment.create({ user_id: req.user.id, test_type, subject, score, total });
    res.status(201).json({ message: 'Assessment saved successfully', id: newAssessment._id });
  } catch (error) {
    console.error('Assessment Save Error:', error);
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const history = await Assessment.find({ user_id: req.user.id }).sort({ timestamp: -1 });
    res.json({ history });
  } catch (error) {
    console.error('Dashboard Fetch Error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard data' });
  }
});

// --- Progress Routes ---
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ completed_topics: user.completed_topics || [] });
  } catch (error) {
    console.error('Progress Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

app.post('/api/progress', authenticateToken, async (req, res) => {
  const { topicId, completed } = req.body;
  if (!topicId) return res.status(400).json({ error: 'Missing topicId' });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let updatedTopics = user.completed_topics || [];
    if (completed && !updatedTopics.includes(topicId)) {
      updatedTopics.push(topicId);
    } else if (!completed) {
      updatedTopics = updatedTopics.filter(id => id !== topicId);
    }

    user.completed_topics = updatedTopics;
    await user.save();

    res.json({ message: 'Progress updated', completed_topics: updatedTopics });
  } catch (error) {
    console.error('Progress Update Error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// --- COMPANY ROUTES ---

app.get('/api/companies', authenticateToken, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

app.post('/api/companies', authenticateToken, isAdmin, async (req, res) => {
  const { id, name, logo, color, roadmap, resources, questions } = req.body;
  try {
    const company = await Company.create({ id, name, logo, color, roadmap, resources, questions });
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create company' });
  }
});

app.post('/api/companies/:id/questions', authenticateToken, isAdmin, async (req, res) => {
  const { type, difficulty, question, hint } = req.body;
  try {
    const company = await Company.findOne({ id: req.params.id });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const newQuestion = {
      id: `custom_${Date.now()}`,
      type,
      difficulty,
      question,
      hint
    };
    
    company.questions.push(newQuestion);
    await company.save();
    
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add question' });
  }
});

app.get('/api/admin/questions', authenticateToken, isAdmin, async (req, res) => {
  // Add an endpoint to fetch all questions for an admin panel if needed
  res.status(200).json({ message: 'Admin questions route working' });
});

// --- CODE EXECUTION ROUTES ---
app.use('/api/code', authenticateToken, codeRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
