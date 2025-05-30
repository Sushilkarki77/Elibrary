import express from 'express';
import { activateUser, inviteUser, login, register, verifyInvitationToken } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/register', register);
router.post('/invite-user', inviteUser);
router.post('/activate-user', activateUser);
router.get('/verify-token/:token', verifyInvitationToken);
router.post('/login', login);


export default router;
