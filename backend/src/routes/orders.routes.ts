import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from '@/controllers/orderController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();

router.post('/', checkJwt, createProduct);
router.get('/', listProducts);
router.get('/:id', getProduct);
router.put('/:id', checkJwt, updateProduct);
router.delete('/:id', checkJwt, deleteProduct);

export default router;
