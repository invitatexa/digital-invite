import { Router } from 'express';
import { createEvent, getMyEvents, updateEvent, deleteEvent, getEventById } from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createEvent);
router.get('/', getMyEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
