import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../models/user.model';
import { RoleModel } from '../models/role.model';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

export interface AuthenticatedRequest extends Request {
    user?:  IUser;
}


export const authenticateToken: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access Denied' });
        return;
    }

    try {
        const verified: IUser = jwt.verify(token, SECRET_KEY) as IUser;
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};


export const authorize = (requiredPermissions: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        const user = req?.user as IUser | undefined;

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const role = await RoleModel.findById(user.role);

        if (!role) {
            res.status(401).json({ message: 'Role not found' });
            return;
        }

        const hasPermission = requiredPermissions.every(permission =>
            role.permissions.includes(permission)
        );

        if (!hasPermission) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }

        next();
    };
};
