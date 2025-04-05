import mongoose from "mongoose";
import { IRole } from "../models/role.model";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface TokenPayload {
    id: string;
    username: string;
    role: mongoose.Types.ObjectId | IRole;
}


type AnswerOption = string;

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string]; 
  answer: AnswerOption;
}

export interface ResponseItem<T> {
    data: T
}



