import { RequestHandler } from "express";
import mongoose from "mongoose";
import { addSubject, deleteSubjectById, dropIndex, getSubjectById, getSubjectsByUserID, ISubject } from "../models/subject.model";
import { ResponseItem } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { findUserByUsername, IUser } from "../models/user.model";

export const createSubject: RequestHandler<unknown, ResponseItem<ISubject> | Error> = async (req, res, next) => {
    try {
        const userName = (req as AuthenticatedRequest)?.user?.username;
        const { subjectName } = req.body;
        if (!subjectName) {
            res.status(400).json({ name: 'error', message: 'Name is required' });
            return;
        }
        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        const user: IUser | null = await findUserByUsername(userName);

        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        // const result = await dropIndex()
        // res.status(201).json({ data: result });

        const subject = await addSubject(subjectName, user);

        if (!subject) {
            res.status(500).json({ name: 'error', message: 'Failed to create subject' });
            return;
        }
        res.status(201).json({ data: subject });
    } catch (error) {
        return next(error);
    }
};

export const getAllSubjects: RequestHandler<unknown, ResponseItem<ISubject[] | null> | Error> = async (req, res, next) => {
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

        const subjects: ISubject[] = await getSubjectsByUserID(user.id) || [];

        res.status(200).json({ data: subjects });
    } catch (error) {
        return next(error);
    }
};

export const getSubject: RequestHandler<{ subjectId: string }, ResponseItem<ISubject> | Error> = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            res.status(400).json({ name: 'error', message: 'Invalid subject ID' });
            return;
        }
        const subject = await getSubjectById(subjectId);
        if (!subject) {
            res.status(404).json({ name: 'error', message: 'Subject not found' });
            return;
        }
        res.status(200).json({ data: subject });
    } catch (error) {
        return next(error);
    }
};

export const deleteSubject: RequestHandler<{ subjectId: string }, ResponseItem<{ message: string }> | Error> = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            res.status(400).json({ name: 'error', message: 'Invalid subject ID' });
            return;
        }
        const deletedSubject = await deleteSubjectById(new mongoose.Types.ObjectId(subjectId));
        if (!deletedSubject) {
            res.status(404).json({ name: 'error', message: 'Subject not found or already deleted' });
            return;
        }
        res.status(200).json({ data: { message: 'Subject deleted successfully' } });
    } catch (error) {
        return next(error);
    }
};
