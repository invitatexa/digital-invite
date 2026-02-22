import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Template from '../models/Template.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

import { renderAndUpload } from '../services/renderService.js';
import { getInviteHtml } from '../utils/templateParser.js';
import Event from '../models/Event.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { templateId, eventId } = req.body;
    const userId = (req as any).user.id;

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    const options = {
      amount: template.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const rzpOrder = await razorpay.orders.create(options);

    const order = new Order({
      userId,
      templateId,
      eventId,
      amount: template.price,
      razorpayOrderId: rzpOrder.id,
      paymentStatus: 'pending',
    });

    await order.save();

    res.status(201).json({
      orderId: order._id,
      razorpayOrderId: rzpOrder.id,
      amount: options.amount,
      currency: options.currency,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Find order and populate linked data
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) return res.status(404).json({ message: "Order not found" });

      const template = await Template.findById(order.templateId);
      const event = await Event.findById(order.eventId);

      if (!template || !event) return res.status(404).json({ message: "Template or Event link broken" });

      // Render the HTML
      const html = getInviteHtml(event.eventData, template.sourceUrl, event.customizations);

      // Generate PDF and upload to S3
      const downloadUrl = await renderAndUpload(html, order._id.toString(), 'pdf');

      order.paymentStatus = 'completed';
      order.razorpayPaymentId = razorpay_payment_id;
      order.downloadUrl = downloadUrl;
      await order.save();

      return res.status(200).json({ message: "Payment verified & Invite generated!", order });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: (req as any).user.id }).populate('templateId eventId');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

