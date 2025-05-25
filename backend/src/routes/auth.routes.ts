import express from 'express';
import { inviteUser, login, register } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/register', register);
router.post('/invite-user', inviteUser);
router.post('/login', login);


export default router;
