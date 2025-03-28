import { RequestHandler } from "express";
import { ResponseItem } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { findUserByUsername } from "../models/user.model";
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

export const addDocumentHandler: RequestHandler<unknown, unknown, IDocument> = async (req, res, next) => {

    try {

        const userName = (req as AuthenticatedRequest)?.user?.username;
        const tempDocument = req.body;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        const document = await addDocument(user.id, tempDocument.documentName);

        res.status(200).json({ data: document })
    } catch (error) {
        return next(error);
    }

}
