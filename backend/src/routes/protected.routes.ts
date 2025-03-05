// src/routes/protected.routes.ts
import { Router } from 'express';
import { simpleAuthMiddleware } from '@/middlewares/simpleAuth';

const router = Router();

router.get('/perfil', simpleAuthMiddleware, (req, res) => {
  // Aqui, req.user contém o payload do token
  res.json({ message: 'Acesso permitido', user: req.user });
});

export default router;
