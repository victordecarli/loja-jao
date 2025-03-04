import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { applyUserMiddleware } from '@/middlewares/user.middleware'
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Regex para validar formato de email (simplificado)
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, 'Por favor, forneça um e-mail válido.']
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Cria automaticamente createdAt e updatedAt
  }
);

// Aplica o middleware de hash de senha
applyUserMiddleware(UserSchema);

// Método de instância para comparar a senha informada com o hash armazenado
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<IUser>('User', UserSchema);
export default UserModel;
