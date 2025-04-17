import express from 'express';
import { addDocumentHandler, confirmUpload, deleteDocumentHandler, getDocumentsByUserIdHandler, getPreSignedURLAndSaveFile, uploadMultiplePDFs } from '../controllers/document.controller';
import { validateRequest } from '../middlewares/requestValidator.middleware';
import { documentSchema } from '../middlewares/schemas';
import { upload } from '../config/multerConfig';
import { getDocumentQuiz, getDocumentSummary, getURLDownloadURL } from '../controllers/documentProcessing.controller';

const router = express.Router();


router.post("/upload-pdf", upload.single("file"), confirmUpload, validateRequest(documentSchema), addDocumentHandler);
router.post("/upload-pdfs", upload.array("files", 5), uploadMultiplePDFs);
router.post("/signed-url", getPreSignedURLAndSaveFile);
router.get("/download-url/:documentId", getURLDownloadURL);

router.post('/', validateRequest(documentSchema), addDocumentHandler);
router.get('/', getDocumentsByUserIdHandler);
router.delete('/:documentId', deleteDocumentHandler);
router.get('/summary/:documentId', getDocumentSummary);
router.get('/quiz/:documentId', getDocumentQuiz);


export default router;
