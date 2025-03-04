import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxLength:100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required:true
    },
  isActive: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    trim: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Brand',
    },
     createdAt: {
      type: Date,
      default: Date.now,
    },
      updatedAt: {
      type: Date,
      default: Date.now,
    },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

// Plugin de paginação
ProductSchema.plugin(mongoosePaginate);

// Índices para melhorar consultas
ProductSchema.index({ name: 1 }); // Índice para busca por nome
ProductSchema.index({ category: 1, isActive: 1 }); // Índice para filtros comuns

export default mongoose.model('Product', ProductSchema);