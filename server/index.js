import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './utils/db.js';

// Mongoose Models
import User from './models/User.js';
import Assessment from './models/Assessment.js';
import Contribution from './models/Contribution.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// --- AUTHENTICATION ROUTES ---

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password_hash: passwordHash });
    const token = jwt.sign({ id: newUser._id, email, name }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser._id, name, email } });
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

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Logged in successfully', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// --- ASSESSMENT ROUTES ---

// app.post('/api/assessments', authenticateToken, async (req, res) => {
//   const { test_type, subject, score, total } = req.body;
//   if (!test_type || !subject || score === undefined || !total) {
//     return res.status(400).json({ error: 'Missing assessment data components' });
//   }
//   try {
//     const newAssessment = await Assessment.create({ user_id: req.user.id, test_type, subject, score, total });
//     res.status(201).json({ message: 'Assessment saved successfully', id: newAssessment._id });
//   } catch (error) {
//     console.error('Assessment Save Error:', error);
//     res.status(500).json({ error: 'Failed to save assessment' });
//   }
// });

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const history = await Assessment.find({ user_id: req.user.id }).sort({ timestamp: -1 });
    res.json({ history });
  } catch (error) {
    console.error('Dashboard Fetch Error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard data' });
  }
});

// --- Serve React Frontend in Production ---
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  // SPA fallback — Express 5 requires '/{*splat}' instead of bare '*'
  app.get('/{*splat}', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
