import express from 'express';
import { login, register } from '../controllers/auth.controllers';
import { authenticateToken } from '../middlewares/auth.middlewares';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${(req as any).user.username}` });
});

export default router;
