import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { taskRoutes } from './routes/taskRoutes';

const app = express();

// Security: Helmet adds various HTTP headers for protection
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "https://media.giphy.com", "data:"],
    },
  },
}));

// Security: CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Security: Rate limiting to prevent DoS/brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export { app };
