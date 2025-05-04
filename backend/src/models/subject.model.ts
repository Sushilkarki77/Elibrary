import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ISubject extends Document {
    subjectName: string;
    userId: mongoose.Types.ObjectId | IUser;
    createdAt?: Date;
    updatedAt?: Date;
}

const SubjectSchema: Schema = new Schema<ISubject>({
    subjectName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const SubjectModel = mongoose.model<ISubject>('Subject', SubjectSchema);

export const getSubjectsByUserID = async (userId: string): Promise<ISubject[]> => {
    return SubjectModel.find({ userId }).populate('userId').exec();
}

export const getSubjectById = async (subjectId: string): Promise<ISubject | null> => {
    return SubjectModel.findById(subjectId).populate('userId').exec();
}

export const deleteSubjectById = async (_id: mongoose.Types.ObjectId): Promise<ISubject | null> => {
    return SubjectModel.findOneAndDelete({ _id }).exec();
}

export const addSubject = async (subjectName: string, user: IUser): Promise<ISubject> => {
    const newSubject = new SubjectModel({ subjectName, userId: user._id });
    return newSubject.save();
}

export const dropIndex = async (): Promise<any> => {
    const result = await SubjectModel.collection.dropIndex('name_1');
} 

