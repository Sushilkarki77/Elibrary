import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError, infer as Infer } from "zod";

export const validateRequest = <T extends ZodSchema>(schema: T) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
       res.status(400).json({ errors: error.errors });
       return;
    }
     res.status(500).json({ message: "Internal server error" });
     return;
  }
};
