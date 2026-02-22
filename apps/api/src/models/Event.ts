import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@digital-invite/types';

const EventSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { type: String, required: true },
  eventData: { type: Schema.Types.Mixed, required: true },
  customizations: { type: Schema.Types.Mixed, default: {} },
  selectedTemplateId: { type: Schema.Types.ObjectId, ref: 'Template' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEvent & mongoose.Document>('Event', EventSchema);
