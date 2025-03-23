import express from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { googleDriveService } from '../services/googleDriveService'

const router = express.Router()

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Formato de arquivo não suportado'))
    }
  }
})

// Upload e processamento de vídeo
router.post('/process', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' })
    }

    // Upload para o Google Drive
    const fileId = await googleDriveService.uploadFile(
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    )

    // Aqui você pode adicionar a lógica de processamento do vídeo
    // Por exemplo, usando FFmpeg ou um serviço de processamento de vídeo

    res.json({
      success: true,
      fileId,
      message: 'Vídeo enviado com sucesso'
    })
  } catch (error) {
    console.error('Erro no processamento:', error)
    res.status(500).json({ error: 'Erro ao processar o vídeo' })
  }
})

// Listar vídeos processados
router.get('/processed', async (req, res) => {
  try {
    const files = await googleDriveService.listFiles()
    const videos = files.filter(file => file.mimeType.startsWith('video/'))
    res.json({ videos })
  } catch (error) {
    console.error('Erro ao listar vídeos:', error)
    res.status(500).json({ error: 'Erro ao listar vídeos' })
  }
})

// Download de vídeo processado
router.get('/download/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    const file = await googleDriveService.downloadFile(fileId)
    res.json({ file })
  } catch (error) {
    console.error('Erro no download:', error)
    res.status(500).json({ error: 'Erro ao baixar o vídeo' })
  }
})

// Deletar vídeo
router.delete('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    await googleDriveService.deleteFile(fileId)
    res.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar vídeo:', error)
    res.status(500).json({ error: 'Erro ao deletar vídeo' })
  }
})

export const videoRoutes = router 