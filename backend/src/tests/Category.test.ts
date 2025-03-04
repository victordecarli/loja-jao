import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import {Category} from '@/models';
import connectDB from '@/config/db';

// Conectar ao banco de dados antes de todos os testes
beforeAll(async () => {
  await connectDB(); // Conecta ao banco de dados de teste
});

// Limpar a coleção de categorias antes de cada teste
beforeEach(async () => {
  await Category.deleteMany({});
});

// Desconectar após todos os testes
afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Limpa o banco de dados
  await mongoose.connection.close(); // Fecha a conexão
});

describe('Category Model', () => {
  it('deveria criar uma nova categoria', async () => {
    const categoryData = {
      name: 'Calçados',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BEHDoyJUUX_8lBLnaQQfPdeeCb0tbhLdeg&s',
      isActive: true,
      order: 1,
    };

    const category = await Category.create(categoryData);

    expect(category).toBeDefined();
    expect(category.name).toBe(categoryData.name);
    expect(category.imageUrl).toBe(categoryData.imageUrl);
    expect(category.isActive).toBe(categoryData.isActive);
    expect(category.order).toBe(categoryData.order);
  });

  it('Não deve criar uma categoria sem um nome', async () => {
    const categoryData = {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BEHDoyJUUX_8lBLnaQQfPdeeCb0tbhLdeg&s',
      isActive: true,
      order: 1,
    };

    await expect(Category.create(categoryData)).rejects.toThrow();
  });

  it('deve criar uma categoria mesmo sem imagem', async () => {
    const categoryData = {
      name: 'Calçados',
      isActive: true,
      order: 1,
    };

    const category = await Category.create(categoryData);

    expect(category).toBeDefined();
    expect(category.name).toBe(categoryData.name);
    expect(category.isActive).toBe(categoryData.isActive);
    expect(category.order).toBe(categoryData.order);
  });


  it('deveria atualizar uma categoria', async () => {
    const category = await Category.create({
      name: 'Roupas',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_rodado_estampado_moda_roupas_femininas_2315_2_c01626b6fc81c1ea5927f4e1b223ff35-ea5927f4e1b223ff3516492706084994-1024-1024.jpg',
      isActive: true,
      order: 2,
    });
    
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      { name: 'Roupas Esportivas' },
      { new: true }
    );

    expect(updatedCategory).toBeDefined();
    expect(updatedCategory?.name).toBe('Roupas Esportivas');
  });

it('deveria atualizar o campo isActive de uma categoria', async () => {
  const category = await Category.create({
    name: 'Roupas',
    imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_rodado_estampado_moda_roupas_femininas_2315_2_c01626b6fc81c1ea5927f4e1b223ff35-ea5927f4e1b223ff3516492706084994-1024-1024.jpg',
    isActive: true,
  });

  const updatedCategory = await Category.findByIdAndUpdate(
    category._id,
    { isActive: false },
    { new: true }
  );

  expect(updatedCategory).toBeDefined();
  expect(updatedCategory?.isActive).toBe(false);
});

  it('deveria excluir uma categoria', async () => {
    const category = await Category.create({
      name: 'Roupas Esportivas',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_rodado_estampado_moda_roupas_femininas_2315_2_c01626b6fc81c1ea5927f4e1b223ff35-ea5927f4e1b223ff3516492706084994-1024-1024.jpg',
      isActive: true,
      order: 3,
    });

    await Category.findByIdAndDelete(category._id);
    const deletedCategory = await Category.findById(category._id);

    expect(deletedCategory).toBeNull();
  });

  it('deve listar todas as categorias', async () => {
    await Category.create([
      {
        name: 'Calçados',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BEHDoyJUUX_8lBLnaQQfPdeeCb0tbhLdeg&s',
        isActive: true,
        order: 1,
      },
      {
        name: 'Roupas',
        imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_rodado_estampado_moda_roupas_femininas_2315_2_c01626b6fc81c1ea5927f4e1b223ff35-ea5927f4e1b223ff3516492706084994-1024-1024.jpg',
        isActive: true,
        order: 2,
      },
    ]);

    const categories = await Category.find();
    expect(categories.length).toBe(2);
  });

  it('deve listar categorias com paginação', async () => {
    await Category.create([
      {
        name: 'Calçados',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BEHDoyJUUX_8lBLnaQQfPdeeCb0tbhLdeg&s',
        isActive: true,
        order: 1,
      },
      {
        name: 'Roupas',
        imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_rodado_estampado_moda_roupas_femininas_2315_2_c01626b6fc81c1ea5927f4e1b223ff35-ea5927f4e1b223ff3516492706084994-1024-1024.jpg',
        isActive: true,
        order: 2,
      },
      {
        name: 'Acessórios',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ5BqjWOWwULceFSuP231upCjtSYKrM_5R7g&s',
        isActive: true,
        order: 3,
      },
    ]);

    const options = {
      page: 1,
      limit: 2,
      sort: { order: 1 },
    };

    const result = await (Category as any).paginate({}, options);
    expect(result.docs.length).toBe(2); // 2 categorias por página
    expect(result.totalDocs).toBe(3); // Total de categorias
    expect(result.totalPages).toBe(2); // Total de páginas
  });

  it('deve desativar uma categoria', async () => {
    const category = await Category.create({
      name: 'Calçados',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BEHDoyJUUX_8lBLnaQQfPdeeCb0tbhLdeg&s',
      isActive: true,
      order: 1,
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      { isActive: false },
      { new: true }
    );

    expect(updatedCategory?.isActive).toBe(false);
  });
});