import { describe, it, expect, beforeAll, afterAll,beforeEach  } from 'vitest';
import mongoose from 'mongoose';
import { Brand } from '@/models';
import connectDB from '@/config/db';

// Conectar ao banco de dados antes de todos os testes
beforeAll(async () => {
  await connectDB(); // Usa a função de conexão
});

beforeEach(async () => {
  await Brand.deleteMany({});
});

// Desconectar após todos os testes
afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Limpa o banco de dados
  await mongoose.connection.close(); // Fecha a conexão
});

describe('Brand Model', () => {
  it('deve atualizar uma marca', async () => {
    const brandData = {
      name: 'Nike',
      imageUrl: 'https://i.pinimg.com/736x/29/df/c6/29dfc6f05b80804c18913851a79c5140.jpg',
      isActive: true,
    };

    const brand = await Brand.create(brandData);

    expect(brand).toBeDefined();
    expect(brand.name).toBe(brandData.name);
    expect(brand.imageUrl).toBe(brandData.imageUrl);
    expect(brand.isActive).toBe(brandData.isActive);
  });

  it('should not create a brand without a name', async () => {
    const brandData = {
      imageUrl: 'https://i.pinimg.com/736x/29/df/c6/29dfc6f05b80804c18913851a79c5140.jpg',
      isActive: true,
    };

    await expect(Brand.create(brandData)).rejects.toThrow();
  });

  it('should update a brand', async () => {
    const brand = await Brand.create({
      name: 'Adidas',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      isActive: true,
    });

    const updatedBrand = await Brand.findByIdAndUpdate(
      brand._id,
      { name: 'Adidas Updated' },
      { new: true }
    );

    expect(updatedBrand?.name).toBe('Adidas Updated');
  });

  it('should delete a brand', async () => {
    const brand = await Brand.create({
      name: 'Puma',
      imageUrl: 'https://logodownload.org/wp-content/uploads/2014/07/puma-logo-1-1.png',
      isActive: true,
    });

    await Brand.findByIdAndDelete(brand._id);
    const deletedBrand = await Brand.findById(brand._id);

    expect(deletedBrand).toBeNull();
  });
});