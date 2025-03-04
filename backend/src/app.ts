import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse do corpo das requisições
app.use(express.json());

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Backend rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});