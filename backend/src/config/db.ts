import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();

// Interface para a configuração do banco de dados
interface DBConfig {
  uri: string;
  options?: mongoose.ConnectOptions;
}

// Configurações para diferentes ambientes
const dbConfig: { [key: string]: DBConfig } = {
  development: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/devdb',
  },
  test: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/testdb', 
  },
  production: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/proddb',
  },
};

// Seleciona a configuração com base no ambiente
const env = process.env.NODE_ENV || 'development';
const { uri, options } = dbConfig[env];

// Função para conectar ao banco de dados
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri, options);
    console.log(`MongoDB connected: ${uri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

export default connectDB;