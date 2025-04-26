import { RequestHandler } from "express";
import { ResponseItem } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { findUserByUsername, IUser } from "../models/user.model";
import { addDocument, deleteDocumentById, getDocumentById, getDocumentsByUserId, IDocument } from "../models/document.model";
import mongoose from "mongoose";
import { deleteFileFromS3, getPreSignedURL } from "../services/s3Service";



export const getDocumentsByUserIdHandler: RequestHandler<unknown, ResponseItem<IDocument[]> | Error> = async (req, res, next) => {
    try {

        const userName = (req as AuthenticatedRequest)?.user?.username;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        const documents: IDocument[] = await getDocumentsByUserId(user.id) || [];

        res.status(200).json({ data: documents })

    } catch (error) {
        return next(error);
    }

}

export const addDocumentHandler: RequestHandler<unknown, ResponseItem<IDocument & {uploadUrl: string}> | Error, {documentLabel: string, documentName: string, subjectId?: string}> = async (req, res, next) => {

    try {

        const userName = (req as AuthenticatedRequest)?.user?.username;
        const reqBody = req.body;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user: IUser | null = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        if(!req.file) {
            res.status(401).json({ name: 'error', message: 'No attachment found' });
            return; 
        }

        const { uploadUrl, filename} = await getPreSignedURL();

        console.log(reqBody)


        const document = await addDocument(user, filename, reqBody.documentLabel, reqBody?.subjectId);

        if(!document) {
            res.status(401).json({ name: 'error', message: 'No attachment found' });
            return; 
        }

        res.status(200).json({ data: {...document, uploadUrl} })
    } catch (error) {
        return next(error);
    }

}







export const getPreSignedURLAndSaveFile: RequestHandler<unknown, ResponseItem<IDocument & {uploadUrl: string}> | Error, {documentLabel: string, documentName: string, subjectId?: string}> = async (req, res, next) => {

    try {

        const userName = (req as AuthenticatedRequest)?.user?.username;
        const reqBody = req.body;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user: IUser | null = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

     

        const { uploadUrl, filename} = await getPreSignedURL();


        const document = await addDocument(user, filename, reqBody.documentLabel, reqBody?.subjectId);
        if(!document) {
            res.status(401).json({ name: 'error', message: 'No attachment found' });
            return; 
        }

        res.status(200).json({ data: {...document, uploadUrl} })
    } catch (error) {
        return next(error);
    }

}



export const deleteDocumentHandler: RequestHandler<{ documentId: string }, ResponseItem<{ message: string }> | Error, unknown> = async (req, res, next) => {
    try {
        const userName = (req as AuthenticatedRequest)?.user?.username;
        const { documentId } = req.params;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        const user = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }


        if (!mongoose.Types.ObjectId.isValid(documentId)) {
            res.status(400).json({ name: 'error', message: 'Invalid document ID' });
            return;
        }

        const documentToBeDeleted = await getDocumentById(documentId);

        if (documentToBeDeleted?.userId?.toString() !== user?._id?.toString()) {
            res.status(401).json({ name: 'error', message: 'Document not found or not authorized' });
            return;
        }


        const documentDeleted = await deleteDocumentById(new mongoose.Types.ObjectId(documentId));

        if (!documentDeleted) {
            res.status(404).json({ name: 'error', message: 'Document not found or not authorized' });
            return;
        }

        await deleteFileFromS3(documentDeleted.documentName);


        res.status(200).json({ data: { message: 'Document deleted successfully' } });
    } catch (error) {
        return next(error);
    }
}


export const confirmUpload: RequestHandler = (req, res, next) => {

    try {
        if (!req.file) {
            res.status(400).json({ name: 'error', message: "No PDF file uploaded" });
            return;
        }
        req.body.documentName = req.file.originalname;
        req.body.documentLabel = req.file.originalname;
        next();
    } catch (error) {
        return next(error);

    }

};

export const uploadMultiplePDFs: RequestHandler<unknown, ResponseItem<{ files: string[], message: string }> | Error> = (req, res, next) => {

    try {
        const files = req.files as Express.Multer.File[] | undefined;
        const fileNames: string[] | undefined = files?.map(x => x.filename);
        if (!fileNames || fileNames.length === 0) {
            res.status(400).json({ name: 'error', message: "No PDF files uploaded" });
            return;
        }
        res.status(200).json({ data: { message: "PDFs uploaded successfully", files: fileNames } });
    } catch (error) {
        return next(error);

    }

};

