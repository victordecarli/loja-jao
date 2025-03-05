import { Request, Response } from 'express';
import { Product, Category, Brand } from '@/models';

// Criar um novo produto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, brand, isActive, imageUrl } = req.body;

    // Verificar se a categoria existe
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(404).json({ message: 'Categoria não encontrada' });
      return;
    }

    // Verificar se a marca existe
    const brandExists = await Brand.findById(brand);
    if (!brandExists) {
      res.status(404).json({ message: 'Marca não encontrada' });
      return;
    }

    // Criar o produto
    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      isActive,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

// Listar todos os produtos com paginação
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', category, brand, isActive } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (isActive) filter.isActive = isActive === 'true';

    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sort: { name: 1 },
      populate: [
        { path: 'category', select: 'name' },
        { path: 'brand', select: 'name' },
      ],
    };

    // Cast para contornar problemas de tipagem com o plugin de paginação
    const products = await (Product as any).paginate(filter, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

// Obter um produto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate('category', 'name')
      .populate('brand', 'name');

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error });
  }
};

// Atualizar um produto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, category, brand, isActive, imageUrl } = req.body;

    // Verificar se o produto existe
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    // Verificar se a nova categoria existe (se fornecida)
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(404).json({ message: 'Categoria não encontrada' });
        return;
      }
    }

    // Verificar se a nova marca existe (se fornecida)
    if (brand) {
      const brandExists = await Brand.findById(brand);
      if (!brandExists) {
        res.status(404).json({ message: 'Marca não encontrada' });
        return;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, brand, isActive, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

// Deletar um produto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};
