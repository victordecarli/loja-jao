import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Aplica o middleware para hash da senha no esquema de usuário.
 * Este middleware utiliza bcrypt para criptografar a senha antes de salvar o documento.
 */
export function applyUserMiddleware(schema: Schema): void {
  schema.pre(
    'save',
    async function (
      this: { isModified: (field: string) => boolean; password: string },
      next: (error?: any) => void
    ) {
      // Se a senha não foi modificada, segue para o próximo middleware
      if (!this.isModified('password')) {
        return next();
      }
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (error) {
        next(error);
      }
    }
  );
}
