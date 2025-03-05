import { Request, Response } from 'express';
import { Category } from '@/models';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, imageUrl, isActive } = req.body;

    // Verificar se a categoria já existe
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ message: 'Categoria já cadastrada' });
      return;
    }

    // Criar a categoria
    const category = await Category.create({ name, imageUrl, isActive });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10' } = req.query;

    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sort: { name: 1 } // Ordenar por nome
    };

    // Usando 'as any' para contornar problemas de tipagem se necessário
    const categories = await (Category as any).paginate({}, options);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: 'Categoria não encontrada' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categoria', error });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, imageUrl, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, imageUrl, isActive },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ message: 'Categoria não encontrada' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: 'Categoria não encontrada' });
      return;
    }
    res.status(204).send(); // Resposta sem conteúdo
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria', error });
  }
};
