const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Get all conversations for the logged-in user
router.get('/conversations', messageController.getConversations);

// Get messages for a specific conversation
router.get('/conversation/:otherUserId', messageController.getConversationMessages);

// Send a new message
router.post('/send', messageController.sendMessage);

// Mark messages as read for a conversation
router.put('/read/:conversationId', messageController.markAsRead);

// Get unread message count
router.get('/unread-count', messageController.getUnreadCount);

module.exports = router; 