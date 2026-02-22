import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from './models/Template.js';

dotenv.config();

const templates = [
  {
    title: 'Royal Wedding',
    category: 'wedding',
    type: 'image',
    price: 999,
    previewUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'wedding_royal.html',
    isPremium: true
  },
  {
    title: 'Modern Birthday',
    category: 'birthday',
    type: 'image',
    price: 499,
    previewUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'birthday_modern.html',
    isPremium: false
  },
  {
    title: 'Traditional Mundan',
    category: 'mundan',
    type: 'image',
    price: 599,
    previewUrl: 'https://images.unsplash.com/photo-1544133782-99092490cc9d?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'mundan_traditional.html',
    isPremium: false
  }
];

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-invite';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    await Template.deleteMany({});
    console.log('Cleared existing templates');

    await Template.insertMany(templates);
    console.log('Seeded templates successfully!');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
