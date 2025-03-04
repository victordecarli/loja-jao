import mongoose, {Schema, Document, PaginateModel} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface ICategory extends Document {
   name: string;
   imageUrl?: string;
   parentCategory?: mongoose.Types.ObjectId;
   isActive: boolean;
   order: number;
   createdAt: Date;
   updatedAt: Date;
}

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

export interface ICategoryModel extends PaginateModel<ICategory> {}

const Category: ICategoryModel = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  CategorySchema
);

export default Category;