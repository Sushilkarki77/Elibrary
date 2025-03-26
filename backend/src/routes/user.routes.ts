import express from 'express';
import { deleteUserHandler, getUsers,  seedRolesHandler } from '../controllers/auth.controllers';
import { authenticateToken, authorize } from '../middlewares/auth.middlewares';


const router = express.Router();

router.get('/', authenticateToken, authorize(['manage_users']), getUsers);
router.get('/', authenticateToken, authorize(['manage_users']), getUsers);
router.delete('/:id', authenticateToken, authorize(['manage_users']), deleteUserHandler);
router.post('/roles/seed', authenticateToken, authorize(['manage_users']), seedRolesHandler);


export default router;
