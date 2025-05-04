export interface Document {
    _id: string;
    documentName: string;
    documentLabel: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    subjectId?: Subject
}

export interface Subject {
    _id: string
    subjectName: string
    userId: User
    createdAt: string
    updatedAt: string
    __v: number
  }

export interface User {
    _id: string;
    username: string;
    password: string;
    role: string | Role;
}

export interface Role {
    name: 'admin' | 'user';
    permissions: string[];
}

type AnswerOption = string;

export interface QuizQuestion {
    question: string;
    options: [string, string, string, string];
    answer: AnswerOption;
}

export type Quiz = { quiz: QuizQuestion[] };