import mongoose from "mongoose";
import { IRole } from "../models/role.model";

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface TokenPayload {
    id: string;
    username: string;
    role: mongoose.Types.ObjectId | IRole;
}

export interface ResponseItem<T> {
    data: T
}
