import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
