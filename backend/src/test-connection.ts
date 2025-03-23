import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: 'https://e1fa050419abeff7df99a43a7f116346.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'af263571c31e45a1c476cefbd1477bb3',
    secretAccessKey: 'b0639ce35d1ce79fa1442c11087cd8a9ff82eba336b76e64f943f007b89c89ed',
  },
});

async function testConnection() {
  try {
    // Teste de upload
    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'saasvideo',
        Key: 'test.txt',
        Body: 'Teste de conexão com Cloudflare R2',
      })
    );
    console.log('✅ Upload realizado com sucesso!');

    // Teste de download
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: 'saasvideo',
        Key: 'test.txt',
      })
    );

    const body = await response.Body?.transformToString();
    console.log('✅ Download realizado com sucesso!');
    console.log('Conteúdo:', body);

    console.log('\n🎉 Conexão com R2 está funcionando corretamente!');
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
  }
}

testConnection(); 