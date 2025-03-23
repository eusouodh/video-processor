# Processador de Vídeos

Uma aplicação web para processamento de vídeos em massa, integrada com Google Drive para armazenamento.

## Funcionalidades

- Upload de vídeos via drag & drop
- Processamento de vídeos em lote
- Integração com Google Drive para armazenamento
- Interface moderna e responsiva
- Suporte a múltiplos formatos de vídeo

## Requisitos

- Node.js 16+
- npm ou yarn
- Conta Google com Google Drive habilitado
- Credenciais de API do Google Cloud Platform

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/processador-videos.git
cd processador-videos
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais:
  - `VITE_API_URL`: URL da API backend
  - `VITE_GOOGLE_CLIENT_ID`: ID do cliente Google
  - `VITE_GOOGLE_CLIENT_SECRET`: Chave secreta do cliente Google

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

## Uso

1. Acesse a aplicação em `http://localhost:3000`
2. Faça login com sua conta Google
3. Faça upload dos vídeos que deseja processar
4. Configure as opções de processamento
5. Inicie o processamento
6. Acompanhe o progresso
7. Faça download dos vídeos processados

## Desenvolvimento

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Armazenamento: Google Drive API
- Processamento: FFmpeg

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 