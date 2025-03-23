import { Router } from 'express';
import { GoogleDriveService } from '../services/googleDriveService';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const driveService = new GoogleDriveService();

// Rota para obter URL de autenticação
router.get('/auth-url', (req, res) => {
  const url = driveService.getAuthUrl();
  res.json({ url });
});

// Callback do OAuth2
router.get('/oauth2callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      throw new Error('Código de autorização não fornecido');
    }

    const tokens = await driveService.getTokens(code);
    driveService.setCredentials(tokens);

    // Aqui você deve salvar os tokens no banco de dados ou sessão do usuário
    res.json({ message: 'Autenticação realizada com sucesso', tokens });
  } catch (error) {
    console.error('Erro no callback:', error);
    res.status(500).json({ error: 'Erro na autenticação' });
  }
});

// Upload de arquivo
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Nenhum arquivo enviado');
    }

    const result = await driveService.uploadFile(
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );

    res.json(result);
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
  }
});

// Download de arquivo
router.get('/download/:fileId', async (req, res) => {
  try {
    const fileBuffer = await driveService.downloadFile(req.params.fileId);
    res.send(fileBuffer);
  } catch (error) {
    console.error('Erro no download:', error);
    res.status(500).json({ error: 'Erro ao fazer download do arquivo' });
  }
});

// Listar arquivos
router.get('/files', async (req, res) => {
  try {
    const files = await driveService.listFiles();
    res.json(files);
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

// Deletar arquivo
router.delete('/files/:fileId', async (req, res) => {
  try {
    await driveService.deleteFile(req.params.fileId);
    res.json({ message: 'Arquivo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    res.status(500).json({ error: 'Erro ao deletar arquivo' });
  }
});

export const googleDriveRoutes = router; 