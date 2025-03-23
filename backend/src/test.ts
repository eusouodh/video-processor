import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend está funcionando!' });
});

app.listen(port, () => {
  console.log(`Servidor de teste rodando na porta ${port}`);
}); 