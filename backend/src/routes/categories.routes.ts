import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, listProducts } from '@/controllers/categoryController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();

router.post('/', checkJwt, createCategory);
router.get('/', listCategory);
router.get('/:id', getCategory;
router.put('/:id', checkJwt, updateCategory);
router.delete('/:id', checkJwt, deleteCategory);

export default router;
