import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
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
    },
  ],
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
}, {
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);