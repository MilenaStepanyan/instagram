import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getMessages, sendMessage, getRecentConversations } from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages/:recipient', verifyToken, getMessages);
router.post('/messages', verifyToken, sendMessage);
router.get('/recent-conversations', verifyToken, getRecentConversations);

export default router;
    