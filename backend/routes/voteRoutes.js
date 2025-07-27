import express from 'express';
import { castVote, getResults } from '../controllers/voteController.js';

const voteRouter = express.Router();

// ✅ Add OPTIONS handler for preflight
voteRouter.options('/vote', (req, res) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://voting-virid.vercel.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});


voteRouter.post('/vote', castVote);
voteRouter.get('/results', getResults);

export default voteRouter;
