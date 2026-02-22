import { Router } from 'express';
import { createOrder, verifyPayment, getUserOrders } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getUserOrders);
router.post('/create', createOrder);
router.post('/verify', verifyPayment);

export default router;
