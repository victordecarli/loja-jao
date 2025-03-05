import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '@/controllers/categoryController';

const router = Router();

router.post('/', createCategory); // Criar uma nova marca
router.get('/', getCategories); // Listar todas as marcas
router.get('/:id', getCategoryById); // Obter uma marca por ID
router.put('/:id', updateCategory); // Atualizar uma marca
router.delete('/:id', deleteCategory); // Deletar uma marca


export default router;
