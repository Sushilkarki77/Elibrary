import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    res.status(500).json({
        message: err.message || 'Internal Server Error',
    });
};

export const routNotFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Route not found',
    });
};
