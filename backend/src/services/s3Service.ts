import { PutObjectCommand, GetObjectCommand, GetObjectCommandOutput, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/s3Client";
import { Readable } from "stream";


const BUCKET = process.env.S3_BUCKET_NAME ?? "";

export const getPreSignedURL = async (): Promise<{uploadUrl: string, filename: string}> => {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        ContentType: 'application/pdf',
    });

    const uploadUrl = await getSignedUrl(s3Client,command, { expiresIn: 300 });

    return { uploadUrl, filename };
};


export const deleteFileFromS3 = async (filename: string): Promise<void> => {  

    const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: filename,
    });
  
    await s3Client.send(command);
  };

export const generateDownloadUrl = async (filename: string): Promise<string> => {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: filename,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
};


export const downloadFileBuffer = async (
    key: string
): Promise<Buffer | null> => {

    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
    });



    try {
        const response: GetObjectCommandOutput = await s3Client.send(command);

        if (!response.Body) return null;

        const stream = response.Body as Readable;

        const chunks: Buffer[] = [];

        for await (const chunk of stream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        return Buffer.concat(chunks);
    } catch (err) {
        console.error("Failed to download from S3:", (err as Error).message);
        return null;
    }
}
