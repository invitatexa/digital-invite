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
    res.status(211).json(template);
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

