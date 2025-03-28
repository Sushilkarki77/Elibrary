import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IDocument extends Document {
    documentName: string;
    userId: mongoose.Types.ObjectId | IUser;
}

const IDocumentSchema: Schema = new Schema<IDocument>({
    documentName: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});


export const DocumentModel = mongoose.model<IDocument>('Document', IDocumentSchema);

export const getDocumentsByUserId = async (userId: string): Promise<IDocument[] | null> => {
    return DocumentModel.find({ userId }).exec();

}

export const deleteDocumentById = async (id: mongoose.Types.ObjectId): Promise<IDocument | null> => {
    return DocumentModel.findOneAndDelete(id).exec();
}

export const addDocument = async (userid: mongoose.Types.ObjectId, documentName: string): Promise<IDocument | null> => {
    const document = new DocumentModel(userid, documentName);
    return await document.save();
}