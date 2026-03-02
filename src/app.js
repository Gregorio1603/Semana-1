import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import habitsRouter from './routes/habits.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/habits', habitsRouter);

export default app;