# 🎯 Placement Readiness App

> A full-stack web application that evaluates engineering students' placement readiness by combining their academic profile with a proctored technical test across 5 CS core subjects — and delivers AI-driven recommendations on skill gaps.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://placement-readiness-five.vercel.app/)

---

## 🚀 Live Demo

🔗 **[https://placement-readiness-five.vercel.app/](https://placement-readiness-five.vercel.app/)**

---

## ✨ Features

- 🔐 **User Authentication** — Secure JWT-based login & registration with bcrypt password hashing
- 📋 **Profile Assessment** — Evaluates CGPA, DSA problems solved, projects, internships & certifications
- 🧪 **Proctored Technical Test** — Full-screen MCQ test across OS, CN, DBMS, OOP & DSA with a 30-minute timer and auto-submit on fullscreen violation
- 📊 **Readiness Score Dashboard** — Weighted scoring algorithm combining profile + technical performance
- 💡 **Personalized Recommendations** — Identifies weak areas and suggests improvement actions
- 🗺️ **Subject Roadmaps** — Structured syllabus for all CS core subjects
- 🏢 **Company-Specific Prep** — Interview tips filtered by target company
- 📈 **Progress Tracking** — Marks completed topics, persisted in MongoDB

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite |
| **Routing** | React Router v6 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | JWT + bcrypt |
| **Deployment** | Vercel (Frontend) |

---

## 🗂️ Project Structure

```
placement-readiness-app/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── pages/     # LandingPage, AuthPage, TechnicalTest, ResultsDashboard, etc.
│       ├── components/# Navbar
│       └── data/      # Question bank
└── backend/           # Express REST API
    ├── models/        # User, Assessment, Contribution (Mongoose schemas)
    └── utils/         # DB connection
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Backend
```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
npm start
```

### Frontend
```bash
cd frontend
npm install
# Create a .env file with:
# VITE_API_BASE=http://localhost:5000
npm run dev
```

---

## 📡 API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/assessments` | ✅ | Save test result |
| GET | `/api/dashboard` | ✅ | Fetch test history |
| GET | `/api/progress` | ✅ | Get completed topics |
| POST | `/api/progress` | ✅ | Update topic progress |

---

## 👨‍💻 Author

Built with ❤️ for placement preparation.
