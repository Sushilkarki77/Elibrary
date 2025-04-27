import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});


export const documentSchema = z.object({
    documentName: z.string(),
    documentLabel: z.string(),
    subjectId:  z.string().optional()
});

export const subjectSchema = z.object({
    subjectName: z.string()
});

export const fileUploadBody = z.object({
    documentName: z.string(),
    documentLabel: z.string()
});

export type UserSchema = z.infer<typeof userSchema>;
export type documentSchema = z.infer<typeof documentSchema>;
