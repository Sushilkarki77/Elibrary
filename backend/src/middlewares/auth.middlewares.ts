import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authenticateToken: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};
