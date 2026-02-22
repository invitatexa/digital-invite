import { Router } from 'express';
import { getProfile, getMyOrders, checkPurchase } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/profile', getProfile);
router.get('/orders', getMyOrders);
router.get('/check-purchase/:templateId/:eventId', checkPurchase);

export default router;
