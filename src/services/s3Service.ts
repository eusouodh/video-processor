import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || ''
  }
})

export const uploadToS3 = async (file: File, key: string): Promise<string> => {
  try {
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME || '',
      Key: key,
      Body: file,
      ContentType: file.type
    })

    await s3Client.send(command)
    return `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error('Erro ao fazer upload para o S3:', error)
    throw error
  }
} 