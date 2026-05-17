import express from 'express';
import { submitCode, runCode, getProblems, getProblemById } from '../controllers/codeController.js';

const router = express.Router();

// Note: these routes will be protected by authenticateToken middleware in index.js
router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);
router.post('/submit/:id', submitCode);
router.post('/run/:id', runCode);

export default router;
