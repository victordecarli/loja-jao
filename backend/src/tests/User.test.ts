import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { User } from '@/models';
import connectDB from '@/config/db';

beforeAll(async () => {
  await connectDB(); // Conecta ao banco de dados de teste
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Limpa o banco de dados
  await mongoose.connection.close(); // Fecha a conexão
});

describe('Modelo de Usuário', () => {
  it('deve criar um novo usuário', async () => {
    const userData = {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      password: 'senha123',
    };

    const user = await User.create(userData);

    expect(user).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Senha deve ser hasheada
  });

  it('não deve criar um usuário sem nome', async () => {
    const userData = {
      email: 'joao@exemplo.com',
      password: 'senha123',
    };

    await expect(User.create(userData)).rejects.toThrow();
  });

  it('não deve criar um usuário com email inválido', async () => {
    const userData = {
      name: 'João Silva',
      email: 'email-invalido',
      password: 'senha123',
    };

    await expect(User.create(userData)).rejects.toThrow();
  });
});