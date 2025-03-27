import express from 'express';
import { getNavItems } from '../controllers/general.coltroller';

const router = express.Router();

router.get('/nav-items', getNavItems);


export default router;
