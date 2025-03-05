import { Request, Response } from 'express';
import { Brand } from '@/models';

// Criar uma nova marca
export const createBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, imageUrl, isActive } = req.body;

    // Verificar se a marca já existe
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      res.status(400).json({ message: 'Marca já cadastrada' });
      return;
    }

    // Criar a marca
    const brand = await Brand.create({ name, imageUrl, isActive });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar marca', error });
  }
};

// Listar todas as marcas com paginação
export const getBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10' } = req.query;

    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sort: { name: 1 },
    };

    // Se o modelo Brand estiver usando mongoose-paginate-v2, pode ser necessário usar "as any" para contornar erros de tipagem
    const brands = await (Brand as any).paginate({}, options);
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar marcas', error });
  }
};

// Obter uma marca por ID
export const getBrandById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      res.status(404).json({ message: 'Marca não encontrada' });
      return;
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar marca', error });
  }
};

// Atualizar uma marca
export const updateBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, imageUrl, isActive } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      id,
      { name, imageUrl, isActive },
      { new: true }
    );

    if (!brand) {
      res.status(404).json({ message: 'Marca não encontrada' });
      return;
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar marca', error });
  }
};

// Deletar uma marca
export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      res.status(404).json({ message: 'Marca não encontrada' });
      return;
    }
    res.status(204).send(); // Status 204: No Content
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar marca', error });
  }
};
