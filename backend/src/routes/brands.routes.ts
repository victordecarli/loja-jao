import { Router } from 'express';
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from '@/controllers/brandController';
const router = Router();

// Rotas para marcas
router.post('/', createBrand); // Criar uma nova marca
router.get('/', getBrands); // Listar todas as marcas
router.get('/:id', getBrandById); // Obter uma marca por ID
router.put('/:id', updateBrand); // Atualizar uma marca
router.delete('/:id', deleteBrand); // Deletar uma marca

export default router;
