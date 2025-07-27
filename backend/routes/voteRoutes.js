import express from 'express';
import { castVote, getResults } from '../controllers/voteController.js';

const voteRouter = express.Router();

// ✅ Add OPTIONS handler for preflight
voteRouter.options('/vote', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});


voteRouter.post('/vote', castVote);
voteRouter.get('/results', getResults);

export default voteRouter;
