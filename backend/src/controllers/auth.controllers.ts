import { Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, getUserByUsername } from '../models/user.model';
import dotenv from 'dotenv';


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

interface AuthRequestBody {
    username: string;
    password: string;
}

export const register: RequestHandler<unknown, unknown, AuthRequestBody, unknown, { page: string }> = async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await getUserByUsername(username)

    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
    }

    const user = await createUser({ username, password });
    res.status(201).json({ message: 'User registered', user });
};

export const login: RequestHandler<unknown, unknown, AuthRequestBody, unknown, { page: string }> = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await getUserByUsername(username);

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
};
