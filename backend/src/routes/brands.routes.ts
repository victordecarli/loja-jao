import { Router } from 'express';
import { createBrand, getBrand, updateBrand, deleteBrand, listBrands } from '@/controllers/brandController';
import { checkJwt } from '../middleware/checkJwt';

const router = Router();

router.post('/', checkJwt, createBrand);
router.get('/', listBrands);
router.get('/:id', getBrand);
router.put('/:id', checkJwt, updateBrand);
router.delete('/:id', checkJwt, deleteBrand);

export default router;
