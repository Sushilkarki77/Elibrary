import { RequestHandler } from "express";
import { QuizQuestion, ResponseItem } from "../interfaces/interfaces";
import { getDocumentById } from "../models/document.model";
import { handleQuizGeneration, handleSummaryGeneration } from "../services/filesProcessing.service";
import { generateDownloadUrl } from "../services/s3Service";


export const getDocumentSummary: RequestHandler<{ documentId: string }, ResponseItem<{ summary: string }> | Error> = async (req, res, next) => {


    try {
        const { documentId } = req.params;

        if (!documentId) {
            res.status(200).json({ name: 'error', message: 'Invalid document id' });
        }

        const document = await getDocumentById(documentId);


        if (!document) {
            res.status(404).json({ name: 'error', message: 'Document does not exist' });
            return;
        }

        const summary: string | null = await handleSummaryGeneration(document.documentName);

        if (!summary) {
            res.status(404).json({ name: 'error', message: 'Coud not generate summary' });
            return;
        }
        res.status(200).json({ data: { summary } })
    } catch (error) {
        next(error);

    }
}


export const getDocumentQuiz: RequestHandler<{ documentId: string }, ResponseItem<QuizQuestion[]> | Error> = async (req, res, next) => {


    try {
        const { documentId } = req.params;

        if (!documentId) {
            res.status(200).json({ name: 'error', message: 'Invalid document id' });
        }

        const document = await getDocumentById(documentId);

        if (!document) {
            res.status(404).json({ name: 'error', message: 'Document does not exist' });
            return;
        }

        const summary: string | null = await handleQuizGeneration(document.documentName);

        if (!summary) {
            res.status(404).json({ name: 'error', message: 'Coud not generate summary' });
            return;
        }

        const cleanedString = summary.replace(/^```json\n/, '').replace(/\n```$/, '');

        const questions: QuizQuestion[] = JSON.parse(cleanedString);

        res.status(200).json({ data: questions })
    } catch (error) {
        next(error);

    }
}

export const getURLDownloadURL: RequestHandler<{ documentId: string }, ResponseItem<{ downloadURL: string }> | Error> = async (req, res, next) => {

    try {
        const { documentId } = req.params;

        if (!documentId) {
            res.status(200).json({ name: 'error', message: 'Invalid document id' });
        }

        const document = await getDocumentById(documentId);


        if (!document) {
            res.status(404).json({ name: 'error', message: 'Document does not exist' });
            return;
        }

        const downloadURL: string = await generateDownloadUrl(document.documentName);

        res.status(200).json({ data: { downloadURL } });
    } catch (error) {
        next(error);
    }
}
