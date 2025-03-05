import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '@/controllers/orderController';

const router = express.Router();

// Rotas para pedidos
router.post('/', createOrder); // Criar um novo pedido
router.get('/', getOrders); // Listar todos os pedidos
router.get('/:id', getOrderById); // Obter um pedido por ID
router.put('/:id/status', updateOrderStatus); // Atualizar o status de um pedido
router.delete('/:id', deleteOrder); // Deletar um pedido

export default router;