# Backend do Processador de Vídeos

Servidor backend para processamento de vídeos em massa, integrado com Google Drive.

## Funcionalidades

- Autenticação com Google Drive
- Upload de vídeos
- Processamento de vídeos
- Armazenamento no Google Drive
- Download de vídeos processados
- Gerenciamento de arquivos

## Requisitos

- Node.js 16+
- npm ou yarn
- Conta Google com Google Drive habilitado
- Credenciais de API do Google Cloud Platform

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/processador-videos.git
cd processador-videos/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais:
  - `PORT`: Porta do servidor (padrão: 5000)
  - `GOOGLE_CLIENT_ID`: ID do cliente Google
  - `GOOGLE_CLIENT_SECRET`: Chave secreta do cliente Google
  - `GOOGLE_REDIRECT_URI`: URL de redirecionamento do OAuth2

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Configuração do Google Cloud Platform

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Habilite a API do Google Drive
4. Crie credenciais OAuth 2.0
5. Configure as URLs de redirecionamento autorizadas
6. Copie o ID do cliente e a chave secreta para o arquivo `.env`

## API Endpoints

### Autenticação
- `GET /api/auth/auth-url`: Retorna a URL de autenticação do Google
- `GET /api/auth/oauth2callback`: Callback do OAuth2

### Vídeos
- `POST /api/videos/process`: Upload e processamento de vídeo
- `GET /api/videos/processed`: Lista vídeos processados
- `GET /api/videos/download/:fileId`: Download de vídeo processado
- `DELETE /api/videos/:fileId`: Deleta um vídeo

## Desenvolvimento

- Node.js + Express + TypeScript
- Google Drive API
- Multer para upload de arquivos
- CORS habilitado

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 