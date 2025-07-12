const Message = require('../models/Message');
const User = require('../models/User');
const Item = require('../models/Item');

// Get all conversations for a user
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
    .populate('sender', 'name avatar location')
    .populate('receiver', 'name avatar location')
    .populate('relatedItem', 'title images')
    .sort({ createdAt: -1 });

    // Group messages by conversation
    const conversations = {};
    messages.forEach(message => {
      const otherUser = message.sender._id.toString() === userId 
        ? message.receiver 
        : message.sender;
      
      const conversationId = message.conversationId;
      
      if (!conversations[conversationId]) {
        conversations[conversationId] = {
          id: conversationId,
          otherUser,
          lastMessage: message,
          unreadCount: 0,
          messages: []
        };
      }
      
      conversations[conversationId].messages.push(message);
      
      // Count unread messages
      if (!message.isRead && message.receiver._id.toString() === userId) {
        conversations[conversationId].unreadCount++;
      }
    });

    // Convert to array and sort by last message time
    const conversationsArray = Object.values(conversations).sort((a, b) => 
      new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    res.json({
      success: true,
      conversations: conversationsArray
    });
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get conversations'
    });
  }
};

// Get messages for a specific conversation
const getConversationMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    // Validate other user exists
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    })
    .populate('sender', 'name avatar')
    .populate('receiver', 'name avatar')
    .populate('relatedItem', 'title images')
    .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, isRead: false },
      { isRead: true }
    );

    res.json({
      success: true,
      messages,
      otherUser: {
        id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar,
        location: otherUser.location
      }
    });
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get conversation messages'
    });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, relatedItemId, swapRequestId, messageType } = req.body;
    const senderId = req.user.id;

    // Validate receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      });
    }

    // Validate related item if provided
    if (relatedItemId) {
      const item = await Item.findById(relatedItemId);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Related item not found'
        });
      }
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      relatedItem: relatedItemId,
      swapRequest: swapRequestId,
      messageType: messageType || 'general'
    });

    await message.save();

    // Populate the message for response
    await message.populate('sender', 'name avatar');
    await message.populate('receiver', 'name avatar');
    if (relatedItemId) {
      await message.populate('relatedItem', 'title images');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

// Mark messages as read
const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    // Get the other user ID from conversation ID
    const [user1Id, user2Id] = conversationId.split('-');
    const otherUserId = user1Id === userId ? user2Id : user1Id;

    // Mark all unread messages from other user as read
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, isRead: false },
      { isRead: true }
    );

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark messages as read'
    });
  }
};

// Get unread message count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const unreadCount = await Message.countDocuments({
      receiver: userId,
      isRead: false
    });

    res.json({
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count'
    });
  }
};

module.exports = {
  getConversations,
  getConversationMessages,
  sendMessage,
  markAsRead,
  getUnreadCount
}; 