import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT, // Optional for Minio/DigitalOcean
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_KEY || '',
  },
  forcePathStyle: true, // Needed for many S3-compatible providers
});

export const uploadToS3 = async (file: Buffer, fileName: string, contentType: string) => {
  const bucketName = process.env.S3_BUCKET || 'digital-invites';
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read', // Ensure public access if needed
  });

  try {
    await s3Client.send(command);
    // Return the URL
    const baseUrl = process.env.S3_ENDPOINT?.replace(/\/$/, '') || `https://${bucketName}.s3.amazonaws.com`;
    return `${baseUrl}/${bucketName}/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
};
