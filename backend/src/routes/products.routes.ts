import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '@/controllers/productController';

const router = express.Router();

// Rotas para produtos
router.post('/', createProduct); // Criar um novo produto
router.get('/', getProducts); // Listar todos os produtos
router.get('/:id', getProductById); // Obter um produto por ID
router.put('/:id', updateProduct); // Atualizar um produto
router.delete('/:id', deleteProduct); // Deletar um produto

export default router;