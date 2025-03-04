import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import {Product, Category, Brand} from '@/models';
import connectDB from '@/config/db';

beforeAll(async () => {
  await connectDB(); // Conecta ao banco de dados de teste
});

beforeEach(async () => {
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Brand.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Limpa o banco de dados
  await mongoose.connection.close(); // Fecha a conexão
});

describe('Product Model', () => {
  it('should create a new product', async () => {
    const category = await Category.create({
      name: 'Calçados',
      imageUrl: 'https://exemplo.com/calcados.jpg',
      isActive: true,
    });

    const brand = await Brand.create({
      name: 'Nike',
      imageUrl: 'https://exemplo.com/nike.jpg',
      isActive: true,
    });

    const productData = {
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo',
      price: 499.99,
      category: category._id,
      brand: brand._id,
      isActive: true,
    };

    const product = await Product.create(productData);

    expect(product).toBeDefined();
    expect(product.name).toBe(productData.name);
    expect(product.description).toBe(productData.description);
    expect(product.price).toBe(productData.price);
    expect(product.category.toString()).toBe((category._id as mongoose.Types.ObjectId).toString());
    expect(product.brand?.toString()).toBe((brand._id as mongoose.Types.ObjectId).toString());
    expect(product.isActive).toBe(productData.isActive);
  });

  it('should not create a product without a name', async () => {
    const productData = {
      description: 'Tênis esportivo',
      price: 499.99,
      category: new mongoose.Types.ObjectId(), // Categoria inválida
      isActive: true,
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });

  it('should not create a product with an invalid category', async () => {
    const productData = {
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo',
      price: 499.99,
      category: new mongoose.Types.ObjectId(), // Categoria inválida
      isActive: true,
    };

    await expect(Product.create(productData)).rejects.toThrow();
  });
});