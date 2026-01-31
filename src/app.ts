import express from 'express';
import path from 'path';
import { taskRoutes } from './routes/taskRoutes';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export { app };
