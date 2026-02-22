import mongoose, { Schema } from 'mongoose';
import { ITemplate } from '@digital-invite/types';

const TemplateSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  price: { type: Number, required: true },
  previewUrl: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITemplate & mongoose.Document>('Template', TemplateSchema);
