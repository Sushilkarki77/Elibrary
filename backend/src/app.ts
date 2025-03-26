import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { authenticateToken, authorize } from './middlewares/auth.middlewares';
import userRoutes from './routes/user.routes';
import { errorHandler, routNotFound } from './handlers/exception.handler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', authenticateToken, authorize(['manage_users']), userRoutes);

app.use(routNotFound);
app.use(errorHandler);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
