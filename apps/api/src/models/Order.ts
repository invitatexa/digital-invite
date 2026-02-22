import mongoose, { Schema } from 'mongoose';
import { IOrder } from '@digital-invite/types';

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  downloadUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder & mongoose.Document>('Order', OrderSchema);
