import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import voteRouter from './routes/voteRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS config with origin + methods

const allowedOrigins = [
  'http://localhost:5173',
  'https://voting-virid.vercel.app',
  'https://voting-p7m58bxa9-sai-karthiks-projects-f1788493.vercel.app'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
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
