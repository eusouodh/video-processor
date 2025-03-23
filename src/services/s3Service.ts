import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand'

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || ''
  }
})

export const uploadToS3 = async (file: File, key: string) => {
  try {
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: file.type
    })

    await s3Client.send(command)
    return `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`
  } catch (error) {
    console.error('Erro ao fazer upload para S3:', error)
    throw error
  }
} 