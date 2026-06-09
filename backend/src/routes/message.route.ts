import express from 'express';
import {
  sendMessage,
  getMessages,
  getUsersForSidebar,
} from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.get('/conversations', protectRoute, getUsersForSidebar);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
