import mongoose, {Schema, Document, PaginateModel} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IBrand extends Document {
    name: string;
    imageUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    
}

const BrandSchema: Schema = new Schema<IBrand>(
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
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Plugin de paginação
BrandSchema.plugin(mongoosePaginate);

// Índice para busca por nome
BrandSchema.index({ name: 1 });

const Brand: PaginateModel<IBrand> = mongoose.model<IBrand, PaginateModel<IBrand>>('Brand', BrandSchema);

// Exportação do modelo
export default Brand;