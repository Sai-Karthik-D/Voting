import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import voteRouter from './routes/voteRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS config with origin + methods
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ✅ JSON body parser
app.use(express.json());

// ✅ Logging middleware for debugging (optional)
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// ✅ Root route to avoid 404 on /
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ API routes
app.use('/api', voteRouter);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
