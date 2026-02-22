import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from './models/Template.js';

dotenv.config();

const templates = [
  {
    title: 'Royal Wedding',
    description: 'Gold-themed traditional Indian wedding invitation.',
    category: 'wedding',
    price: 999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'wedding_royal.html',
    isActive: true
  },
  {
    title: 'Modern Birthday',
    description: 'Clean and colorful geometric design for birthdays.',
    category: 'birthday',
    price: 499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'birthday_modern.html',
    isActive: true
  },
  {
    title: 'Traditional Mundan',
    description: 'Auspicious design for Mundan ceremonies.',
    category: 'mundan',
    price: 599,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544133782-99092490cc9d?auto=format&fit=crop&q=80&w=800',
    sourceUrl: 'mundan_traditional.html',
    isActive: true
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
