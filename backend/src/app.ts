import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { authenticateToken, authorize } from './middlewares/auth.middlewares';
import userRoutes from './routes/user.routes';
import { errorHandler, routNotFound } from './handlers/exception.handler';
import morgan from 'morgan';
import cors from 'cors';
import generalRoutes from './routes/general.routes';
import documentsRoutes from './routes/documents.routes';


dotenv.config();

const app = express();
app.disable('x-powered-by');
app.disable('etag');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/general',authenticateToken, generalRoutes);
app.use('/documents',authenticateToken, documentsRoutes);


app.use('/users', authenticateToken, authorize(['manage_users']), userRoutes);

app.use(routNotFound);
app.use(errorHandler);

connectDB();

export default app;




