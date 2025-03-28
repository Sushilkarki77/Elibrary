import { RequestHandler } from "express";
import { ResponseItem } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { findUserByUsername, IUser } from "../models/user.model";
import { addDocument, getDocumentsByUserId, IDocument } from "../models/document.model";



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

export const addDocumentHandler: RequestHandler<unknown, unknown, { documentName: string }> = async (req, res, next) => {

    try {

        const userName = (req as AuthenticatedRequest)?.user?.username;
        const tempDocument = req.body;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user: IUser | null = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }


        const document = await addDocument(user, tempDocument.documentName);

        res.status(200).json({ data: document })
    } catch (error) {
        return next(error);
    }

}


export const confirmUpload: RequestHandler  = (req, res, next) => {

    try {
        if (!req.file) {
            res.status(400).json({ name: 'error', message: "No PDF file uploaded" });
            return;
        }
        req.body.documentName = req.file.filename;
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
