import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Plugin de paginação
CategorySchema.plugin(mongoosePaginate);

// Índice para busca por nome e relacionamento com categoria pai
CategorySchema.index({ name: 1 });
CategorySchema.index({ parentCategory: 1 });

// Exportação do modelo
export default mongoose.model('Category', CategorySchema);