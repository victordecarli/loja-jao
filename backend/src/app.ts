import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from '@/routes/users.routes';
import productsRoutes from '@/routes/products.routes';
import categoriesRoutes from '@/routes/categories.routes';
import ordersRoutes from '@/routes/orders.routes';
import brandsRoutes from '@/routes/brands.routes';
import {handleAuthErrors}  from '@/middlewares/handleAuthErrors';

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();


// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Backend rodando!');
});

// Montar as rotas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/brands', brandsRoutes);

// Middleware de tratamento de erros de autenticação e outros erros
app.use(handleAuthErrors);

// Rota para 404 (não encontrada)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de tratamento de erros gerais
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  res.status(status).json({ error: message });
});


export default app;