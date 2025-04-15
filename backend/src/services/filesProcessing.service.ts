import fs from 'fs/promises';
import path from 'path';
import pdf, { Result } from 'pdf-parse';
import { GoogleGenerativeAI } from "generative-ai";


const readFile = async (filePath: string): Promise<Buffer> => {
  const blogFIles = await fs.readFile(filePath);
  return blogFIles;
}


export const extractTextContents = async (pdfContent: Buffer): Promise<Result> => {
  const extractedText = await pdf(pdfContent);
  return extractedText;
}


export const extractContents = async (text: string, prompt: string) => {
  const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyD7p7Tv4sZoElXCvqvogTb4_Ryn37lzXiw';

  if (!API_KEY) {
    throw new Error("GOOGLE_API_KEY environment variable is not set.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return null;
  }
}


export const generateSummary = async (text: string): Promise<string | null> => {
  const prompt = `Summarize the following text:\n\n${text}\n\nSummary:`;
  const extractedText = await extractContents(text, prompt);
  return extractedText;
}



export const generateQuiz = (text: string): Promise<string | null> => {
  const numberOfQuestions = 20;
  const prompt = `Generate ${numberOfQuestions} multiple choice questions based on the following text content:\n\n${text}\n\nReturn the questions in JSON format. Each question should have the following structure:\n\n{\n  "question": "[Question text]",\n  "options": ["Option A", "Option B", "Option C", "Option D"],\n  "answer": "[Correct answer]"\n}\n\nReturn the entire set of questions as a JSON array.`;
  const extractedText = extractContents(text, prompt);
  return extractedText;
}

export const handleSummaryGeneration = async (filename: string): Promise<string | null> => {
  try {
    const blob = await readFileFronStorage(filename);
    const extractedContents: Result = await extractTextContents(blob);
    const summaryText = await generateSummary(extractedContents.text);
    return summaryText;
  } catch (error) {
    throw error;
  }

}


export const handleQuizGeneration = async (filename: string): Promise<string | null> => {
  try {
    const blob = await readFileFronStorage(filename);
    const extractedContents: Result = await extractTextContents(blob);
    const summaryText = await generateQuiz(extractedContents.text);
    return summaryText;
  } catch (error) {
    throw error;
  }
}


export const readFileFronStorage = async (fileName: string) => {
  try {
    const blob = await readFile(path.join(`uploads/${fileName}`));
    return blob;
  } catch (error) {
    throw error;
  }
}

// (async () => {
//     const blob = await readFile(path.join('file-1743382128819-599593192.pdf'));
//     const extractedContents: Result = await extractTextContents(blob);
//     generateSummary(extractedContents.text);
// })()



