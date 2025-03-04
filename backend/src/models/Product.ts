import mongoose, {Schema, Document, PaginateModel} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IProducts extends Document {
  name: string;
  description?: string;
  price: number;
  category: mongoose.Types.ObjectId;
  isActive: boolean;
  imageUrl: string;
  brand: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
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
    ref: 'Brand',
    required:true
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

// Plugin de paginação
ProductSchema.plugin(mongoosePaginate);

// Índices para melhorar consultas
ProductSchema.index({ name: 1 }); // Índice para busca por nome
ProductSchema.index({ category: 1, isActive: 1 }); // Índice para filtros comuns


const Product = mongoose.model<IProducts, PaginateModel<IProducts>>('Product', ProductSchema);

export default Product;