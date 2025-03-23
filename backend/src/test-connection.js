import { S3 } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
});

const s3 = new S3({
  endpoint: 'https://e1fa050419abeff7df99a43a7f116346.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'af263571c31e45a1c476cefbd1477bb3',
    secretAccessKey: 'b0639ce35d1ce79fa1442c11087cd8a9ff82eba336b76e64f943f007b89c89ed',
  },
  region: 'auto',
  forcePathStyle: true,
  requestHandler: new NodeHttpHandler({
    httpAgent: agent,
    httpsAgent: agent,
  }),
});

async function testConnection() {
  try {
    console.log('🔄 Iniciando teste de conexão com R2...');
    
    // Teste de upload
    console.log('📤 Tentando fazer upload...');
    await s3.putObject({
      Bucket: 'saasvideo',
      Key: 'test.txt',
      Body: 'Teste de conexão com Cloudflare R2',
      ContentType: 'text/plain',
    });
    console.log('✅ Upload realizado com sucesso!');

    // Teste de download
    console.log('📥 Tentando fazer download...');
    const response = await s3.getObject({
      Bucket: 'saasvideo',
      Key: 'test.txt',
    });

    const body = await response.Body?.transformToString();
    console.log('✅ Download realizado com sucesso!');
    console.log('📄 Conteúdo:', body);

    console.log('\n🎉 Conexão com R2 está funcionando corretamente!');
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    console.error('📝 Detalhes:', error.message);
    if (error.Code) console.error('🔍 Código de erro:', error.Code);
    if (error.$metadata) console.error('📊 Metadata:', JSON.stringify(error.$metadata, null, 2));
    
    // Informações adicionais para debug
    console.error('\n🔍 Informações de debug:');
    console.error('- Endpoint:', s3.config.endpoint);
    console.error('- Região:', s3.config.region);
    console.error('- Bucket:', 'saasvideo');
  }
}

console.log('🚀 Iniciando teste de conexão...\n');
testConnection(); 