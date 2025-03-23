import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { googleDriveRoutes } from './routes/googleDriveRoutes';
import { videoRoutes } from './routes/videoRoutes';

// Configuração do ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Configuração do OAuth2
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/auth', googleDriveRoutes);
app.use('/api/videos', videoRoutes);

// Rotas de autenticação
app.get('/api/auth/google/url', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
  res.json({ url });
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Aqui você pode salvar os tokens no banco de dados
    res.redirect('/');
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({ error: 'Erro na autenticação' });
  }
});

// Rotas de processamento de vídeo
app.post('/api/videos/upload', upload.array('videos'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Aqui você pode iniciar o processamento dos vídeos
    const jobId = uuidv4();

    // Simular início do processamento assíncrono
    processVideos(jobId, files);

    res.json({ jobId });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro no upload dos vídeos' });
  }
});

app.get('/api/videos/status/:jobId', (req, res) => {
  const { jobId } = req.params;

  // Aqui você pode verificar o status do processamento no banco de dados
  // Por enquanto, vamos simular um status
  res.json({
    status: 'processing',
    progress: 50,
  });
});

// Função para processar os vídeos (simulada)
async function processVideos(jobId: string, files: Express.Multer.File[]) {
  try {
    // Aqui você implementaria a lógica real de processamento
    console.log(`Iniciando processamento do job ${jobId} com ${files.length} arquivos`);

    // Simular processamento
    setTimeout(() => {
      console.log(`Processamento do job ${jobId} concluído`);
    }, 10000);
  } catch (error) {
    console.error(`Erro no processamento do job ${jobId}:`, error);
  }
}

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
}); 