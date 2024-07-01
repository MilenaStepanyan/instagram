import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getMessages, getRecentChats, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.post('/send-message', sendMessage);
router.get('/get-messages/:username/:recipient', getMessages);
router.get('/get-recent-chats/:username', getRecentChats);

export default router;
