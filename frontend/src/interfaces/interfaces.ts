export interface Document {
    _id: string;
    documentName: string;
    documentLabel: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
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