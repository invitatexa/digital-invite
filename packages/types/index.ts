export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
}

export interface IEvent {
  id?: string;
  userId: string;
  eventType: string; // Wedding, Birthday, etc.
  eventData: any; // Dynamic JSON
  customizations?: any; // Colors, fonts, etc.
  selectedTemplateId?: string;
  createdAt?: Date;
}

export interface ITemplate {
  id?: string;
  _id?: any;
  title: string;
  category: string;
  type: 'image' | 'video';
  price: number;
  previewUrl: string;
  sourceUrl: string;
  isPremium: boolean;
}

export interface IOrder {
  id?: string;
  userId: string;
  templateId: string;
  eventId: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  downloadUrl?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt?: Date;
}
