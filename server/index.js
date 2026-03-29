import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_dev_key';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database at', dbPath);
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        test_type TEXT NOT NULL,
        subject TEXT NOT NULL,
        score INTEGER NOT NULL,
        total INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS contributions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        company_name TEXT NOT NULL,
        question_text TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
  });
}

// --- Middleware: Verify Token ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

// 1. Register User
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    db.run(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
             return res.status(409).json({ error: 'Email already exists' });
          }
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        // Auto-login after register
        const token = jwt.sign({ id: this.lastID, email, name }, SECRET_KEY, { expiresIn: '24h' });
        res.status(201).json({ message: 'User registered successfully', token, user: { id: this.lastID, name, email } });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Login User
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// 3. Get User Profile (Protected)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// --- ASSESSMENT ROUTES ---

// Submit a test score (Protected)
app.post('/api/assessments', authenticateToken, (req, res) => {
  const { test_type, subject, score, total } = req.body;
  
  if (!test_type || !subject || score === undefined || !total) {
    return res.status(400).json({ error: 'Missing assessment data components' });
  }

  db.run(
    'INSERT INTO assessments (user_id, test_type, subject, score, total) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, test_type, subject, score, total],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save assessment' });
      }
      res.status(201).json({ message: 'Assessment saved successfully', id: this.lastID });
    }
  );
});

// Get User Dashboard Data (Protected)
app.get('/api/dashboard', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM assessments WHERE user_id = ? ORDER BY timestamp DESC',
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to retrieve dashboard data' });
      res.json({ history: rows });
    }
  );
});

// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
