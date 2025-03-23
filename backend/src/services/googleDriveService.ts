import { google } from 'googleapis';
import { Readable } from 'stream';

export class GoogleDriveService {
  private drive: any;
  private folderId: string | null = null;

  constructor() {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    this.drive = google.drive({ version: 'v3', auth });
  }

  setCredentials(tokens: any) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials(tokens);
    this.drive = google.drive({ version: 'v3', auth });
  }

  getAuthUrl() {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    return auth.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file']
    });
  }

  async getTokens(code: string) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await auth.getToken(code);
    this.setCredentials(tokens);
    return tokens;
  }

  async createFolder(folderName: string) {
    try {
      const response = await this.drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder'
        }
      });

      this.folderId = response.data.id;
      return this.folderId;
    } catch (error) {
      console.error('Erro ao criar pasta:', error);
      throw error;
    }
  }

  async uploadFile(fileName: string, fileContent: Buffer | Readable, mimeType: string) {
    try {
      if (!this.folderId) {
        await this.createFolder('Videos Processados');
      }

      const response = await this.drive.files.create({
        requestBody: {
          name: fileName,
          parents: [this.folderId!]
        },
        media: {
          mimeType,
          body: fileContent
        }
      });

      return response.data.id;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }

  async downloadFile(fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId,
        alt: 'media'
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.drive.files.delete({
        fileId
      });
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw error;
    }
  }

  async listFiles() {
    try {
      if (!this.folderId) {
        return [];
      }

      const response = await this.drive.files.list({
        q: `'${this.folderId}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType, createdTime)',
        orderBy: 'createdTime desc'
      });

      return response.data.files;
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      throw error;
    }
  }
}

export const googleDriveService = new GoogleDriveService(); 