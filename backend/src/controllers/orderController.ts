import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IOrderItem } from '@/models/Order';
import { Order, Product, User } from '@/models';

// Criar um novo pedido
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, items, paymentMethod } = req.body;

    // Verificar se o usuário existe
    const userExists = await User.findById(user);
    if (!userExists) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Verificar se os produtos existem e calcular o total
    let total = 0;
    const orderItems: IOrderItem[] = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ message: `Produto ${item.product} não encontrado` });
        return;
      }

      orderItems.push({
        product: product._id as mongoose.Types.ObjectId,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });

      total += product.price * item.quantity;
    }

    // Criar o pedido
    const order = await Order.create({
      user,
      items: orderItems,
      total,
      paymentMethod,
      status: 'Em aberto',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido', error });
  }
};

// Listar todos os pedidos com paginação
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10' } = req.query;

    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sort: { createdAt: -1 },
      populate: [
        { path: 'user', select: 'name email' },
        { path: 'items.product', select: 'name price' }
      ],
    };

    // Se o modelo Order estiver usando mongoose-paginate-v2, pode ser necessário fazer cast para any
    const orders = await (Order as any).paginate({}, options);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error });
  }
};

// Obter um pedido por ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) {
      res.status(404).json({ message: 'Pedido não encontrado' });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error });
  }
};

// Atualizar o status de um pedido
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verificar se o status é válido
    const validStatuses = ['Em aberto', 'Pago', 'Cancelado'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Status inválido' });
      return;
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Pedido não encontrado' });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error });
  }
};

// Deletar um pedido
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      res.status(404).json({ message: 'Pedido não encontrado' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido', error });
  }
};
