import { Router } from 'express';
import { getTemplates, createTemplate, getTemplateById, getTemplatePreview, updateTemplate, deleteTemplate } from '../controllers/templateController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.get('/:id/preview/:eventId', getTemplatePreview);
router.post('/', authMiddleware, adminMiddleware, createTemplate);
router.put('/:id', authMiddleware, adminMiddleware, updateTemplate);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTemplate);

export default router;
