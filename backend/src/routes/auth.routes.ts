import express from 'express';
import { deleteUserHandler, getUsers, login, register, seedRolesHandler } from '../controllers/auth.controllers';
import { authenticateToken, authorize } from '../middlewares/auth.middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users/', getUsers);
router.get('/users/', getUsers);
router.delete('/users/:id', deleteUserHandler);
router.post('/roles/seed', seedRolesHandler);


export default router;
