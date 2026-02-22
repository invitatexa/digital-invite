import { Request, Response } from 'express';
import Event from '../models/Event.js';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { eventType, eventData } = req.body;
    const userId = (req as any).user.id;

    const event = new Event({ userId, eventType, eventData });
    await event.save();

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { eventData, customizations, selectedTemplateId } = req.body;
    const userId = (req as any).user.id;

    const event = await Event.findOneAndUpdate(
      { _id: id, userId },
      { eventData, customizations, selectedTemplateId },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const event = await Event.findOneAndDelete({ _id: id, userId });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
