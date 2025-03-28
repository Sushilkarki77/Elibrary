import express from 'express';
import { addDocumentHandler, getDocumentsByUserIdHandler } from '../controllers/document.controller';
import { validateRequest } from '../middlewares/requestValidator.middleware';
import { documentSchema } from '../middlewares/schemas';

const router = express.Router();

router.post('/',validateRequest(documentSchema), addDocumentHandler);
router.get('/', getDocumentsByUserIdHandler);



export default router;
