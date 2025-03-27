import { RequestHandler } from "express";
import { IRole } from "../models/role.model";
import { findUserByUsername } from "../models/user.model";
import { ResponseItem } from "../interfaces/interfaces";

export const getNavItems: RequestHandler<unknown, ResponseItem<{name: string, path: string}[]> | Error > = async (req, res, next) => {
    try {
        const user = await findUserByUsername((req as any).user.username);
        if (!user) {
            res.status(404).json({name: 'error', message: 'User not found' });
            return;
        }

        const adminNav = [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Manage Users', path: '/users' },
        ];

        const userNav = [
            { name: 'Dashboard', path: '/dashboard' },
           
        ];

        const navItems = (user.role as IRole).name === 'admin' ? adminNav : userNav;
        res.status(200).json({data: navItems});
        return;
    } catch (error) {
        return next(error);
    }
};