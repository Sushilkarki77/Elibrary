import { RequestHandler } from "express";
import { IRole } from "../models/role.model";
import { findUserByUsername } from "../models/user.model";
import { ResponseItem } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";

export const getNavItems: RequestHandler<unknown, ResponseItem<{ name: string, path: string, icon: string }[]> | Error> = async (req, res, next) => {
    try {
        const userName = (req as AuthenticatedRequest)?.user?.username;

        if (!userName) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }
        const user = await findUserByUsername(userName);
        if (!user) {
            res.status(404).json({ name: 'error', message: 'User not found' });
            return;
        }

        const adminNav = [
            { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
            { name: 'Manage Users', path: '/users', icon: 'users' },
            { name: 'Subjects', path: '/subjects', icon: 'folder' },

        ];

        const userNav = [
            { name: 'Dashboard', path: '/dashboard',icon: 'dashboard' },
            { name: 'Subjects', path: '/subjects', icon: 'folder' }


        ];

        const navItems = (user.role as IRole).name === 'admin' ? adminNav : userNav;
        res.status(200).json({ data: navItems });
        return;
    } catch (error) {
        return next(error);
    }
};