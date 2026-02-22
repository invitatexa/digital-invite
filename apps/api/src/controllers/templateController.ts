import { Request, Response } from 'express';
import Template from '../models/Template.js';

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const query = category ? { category: category as string } : {};
    const templates = await Template.find(query);
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const templateData = req.body;
    const template = new Template(templateData);
    await template.save();
    res.status(201).json(template);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import Event from '../models/Event.js';
import { getInviteHtml } from '../utils/templateParser.js';

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplatePreview = async (req: Request, res: Response) => {
  try {
    const { id, eventId } = req.params;
    const template = await Template.findById(id);
    const event = await Event.findById(eventId);
    
    if (!template || !event) {
        return res.status(404).json({ message: 'Template or Event not found' });
    }

    const html = getInviteHtml(event.eventData, template.sourceUrl, event.customizations);
    res.send(html);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const seedTemplates = async (req: Request, res: Response) => {
    try {
        const templatesData = [
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
        
        await Template.deleteMany({});
        const seeded = await Template.insertMany(templatesData);
        res.json({ message: 'Templates seeded successfully', count: seeded.length });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

