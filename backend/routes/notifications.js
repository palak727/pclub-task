import express from 'express';
import { getNotifications, getUnreadNotificationCount, markNotificationRead } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getNotifications);
router.get('/unread-count', authMiddleware, getUnreadNotificationCount);
router.patch('/:id/read', authMiddleware, markNotificationRead);

export default router;
