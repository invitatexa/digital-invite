import { Router } from 'express';
import { createEvent, getMyEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createEvent);
router.get('/', getMyEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
