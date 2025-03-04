import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import usersRoutes from '@/routes/users.routes';
import productsRoutes from '@/routes/products.routes';
import categoriesRoutes from '@/routes/categories.routes';
import ordersRoutes from '@/routes/orders.routes';
import brandsRoutes from '@/routes/brands.routes';

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

// Montar as rotas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/brands', brandsRoutes);