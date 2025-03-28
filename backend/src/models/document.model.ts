import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IDocument extends Document {
    documentName: string;
    documentLabel: string;
    userId: mongoose.Types.ObjectId | IUser;
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
    }
}, { timestamps: true }

);


export const DocumentModel = mongoose.model<IDocument>('Document', IDocumentSchema);

export const getDocumentsByUserId = async (userId: string): Promise<IDocument[] | null> => {
    return DocumentModel.find({ userId }).exec();

}

export const getDocumentById = async (documentId: string): Promise<IDocument | null> => {
    return DocumentModel.findById(documentId).exec();
}

export const deleteDocumentById = async (_id: mongoose.Types.ObjectId): Promise<IDocument | null> => {
    return DocumentModel.findOneAndDelete(_id).exec();
}

export const addDocument = async (user: IUser, documentName: string, documentLabel: string): Promise<IDocument | null> => {
    return new DocumentModel({ documentName, userId: user._id, documentLabel }).save().then((post) => post.toObject() as IDocument);
}