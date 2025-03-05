import mongoose, { Schema, Document,PaginateModel  } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  paymentMethod: 'Dinheiro' | 'Cartão' | 'Pix';
  status: 'Em aberto' | 'Pago' | 'Cancelado';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});


const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Dinheiro', 'Cartão', 'Pix'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Em aberto', 'Pago', 'Cancelado'],
      default: 'Em aberto',
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

OrderSchema.pre('save', function (next) {
  // 'this' se refere ao documento de Order
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce((acc, item) => {
      return acc + item.quantity * item.priceAtPurchase;
    }, 0);
  }
  next();
});

OrderSchema.plugin(mongoosePaginate);

const Order = mongoose.model<IOrder, PaginateModel<IOrder>>('Order', OrderSchema);
export default Order;
