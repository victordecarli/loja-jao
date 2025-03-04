import dotenv from "dotenv"

dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
    expiresIn: process.env.JWT_EXPIRES_IN || '1hr'
  }
};
