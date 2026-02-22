import { Request, Response } from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.find({ userId }).populate('templateId');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const checkPurchase = async (req: Request, res: Response) => {
    try {
        const { templateId, eventId } = req.params;
        const userId = (req as any).user.id;
        const order = await Order.findOne({ userId, templateId, eventId, paymentStatus: 'completed' });
        res.json({ purchased: !!order, downloadUrl: order?.downloadUrl });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
