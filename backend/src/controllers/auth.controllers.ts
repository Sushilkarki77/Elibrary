import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createUser, deleteUserById, findUserByUsername, getAllUsers, IUser } from '../models/user.model';
import { RoleModel, IRole, seedRoles } from '../models/role.model';
import mongoose from 'mongoose';
import { AuthRequestBody, TokenPayload } from '../interfaces/interfaces';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

export const register: RequestHandler<unknown, unknown, AuthRequestBody> = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }


        if (password.length < 6) {
            res.status(401).json({ message: 'password must be of length 6' });
            return;
        }


        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const userRole: IRole | null = await RoleModel.findOne({ name: 'user' });
        if (!userRole) {
            res.status(500).json({ message: 'Default role not found' });
            return;
        }

        const newUser = await createUser(username, password, userRole._id as mongoose.Types.ObjectId);
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        return next(error);
    }
};


export const login: RequestHandler<unknown, unknown, AuthRequestBody> = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        const user = await findUserByUsername(username);
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const tokenPayload: TokenPayload = {
            id: user.id.toString(),
            username: user.username,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        return next(error);
    }
};


export const getUsers: RequestHandler<unknown, unknown, AuthRequestBody> = async (req, res, next) => {
    try {
        const users: IUser[] | null = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return next(error);
    }
}


export const deleteUserHandler: RequestHandler<{ id: string }, unknown, unknown> = async (req, res, next): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const deletedUser: IUser | null = await deleteUserById(id);

        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        next(error);
    }
};




export const seedRolesHandler: RequestHandler = async (req, res, next) => {

    try {
        await seedRoles();
        res.status(200).json({ message: 'Roles added successfully!' })
    } catch (error) {
        return next(error);
    }

}

