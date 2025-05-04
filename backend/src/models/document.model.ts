import mongoose, { PopulateOptions, Schema } from "mongoose";
import { IUser } from "./user.model";
import { ISubject } from "./subject.model";

export interface IDocument extends Document {
    documentName: string;
    documentLabel: string;
    userId: mongoose.Types.ObjectId | IUser;
    subjectId?: mongoose.Types.ObjectId | ISubject;
    createdAt?: Date;
    updatedAt?: Date;
}

const IDocumentSchema: Schema = new Schema<IDocument>({
    documentName: {
        type: String,
        required: true,
        unique: true
    },
    documentLabel: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false,
    }
}, { timestamps: true }

);


export const DocumentModel = mongoose.model<IDocument>('Document', IDocumentSchema);

export const getDocumentsByUserId = async (userId: string): Promise<IDocument[] | null> => {
    return DocumentModel.find({ userId }) .populate('subjectId').populate({
        path: 'subjectId',
        as: 'subject' 
      }as PopulateOptions).exec();

}

export const getDocumentById = async (documentId: string): Promise<IDocument | null> => {
    return DocumentModel.findById(documentId).exec();
}

export const deleteDocumentById = async (_id: mongoose.Types.ObjectId): Promise<IDocument | null> => {
    return DocumentModel.findOneAndDelete(_id).exec();
}

export const addDocument = async (user: IUser, documentName: string, documentLabel: string, subjectId?: string): Promise<IDocument | null> => {
    const reqDocument = subjectId ? { documentName, userId: user._id, documentLabel, subjectId } : { documentName, userId: user._id, documentLabel };
    const newDocument = await new DocumentModel(reqDocument).save();
    const populatedDocument = await DocumentModel.findById(newDocument._id).populate('subjectId').exec();
    return populatedDocument ? populatedDocument.toObject() as IDocument : null;
}