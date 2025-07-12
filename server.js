const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const messageRoutes = require('./src/routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rewear', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Simple auth middleware for demo
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  // For demo purposes, assume any token is valid
  // In production, you would verify the JWT token
  req.user = { id: '1' }; // Demo user ID
  next();
};

// Apply auth middleware to message routes
app.use('/api/messages', auth, messageRoutes);

// Demo endpoints for testing
app.get('/api/messages/unread-count', auth, (req, res) => {
  res.json({ success: true, unreadCount: Math.floor(Math.random() * 5) });
});

app.get('/api/messages/conversations', auth, (req, res) => {
  // Demo conversations
  res.json({
    success: true,
    conversations: [
      {
        id: '1-2',
        otherUser: {
          id: '2',
          name: 'Sarah M.',
          avatar: 'SM',
          location: 'NYC'
        },
        lastMessage: {
          content: 'Hi! I\'m interested in your leather jacket. Is it still available?',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          sender: { _id: '2' },
          receiver: { _id: '1' }
        },
        unreadCount: 1
      },
      {
        id: '1-3',
        otherUser: {
          id: '3',
          name: 'Emma K.',
          avatar: 'EK',
          location: 'LA'
        },
        lastMessage: {
          content: 'Thanks for the swap! The blouse is perfect.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          sender: { _id: '3' },
          receiver: { _id: '1' }
        },
        unreadCount: 0
      }
    ]
  });
});

app.get('/api/messages/conversation/:otherUserId', auth, (req, res) => {
  const { otherUserId } = req.params;
  
  // Demo messages
  const messages = [
    {
      _id: '1',
      content: 'Hi! I\'m interested in your leather jacket. Is it still available?',
      sender: { _id: otherUserId, name: otherUserId === '2' ? 'Sarah M.' : 'Emma K.' },
      receiver: { _id: '1', name: 'Jordan Smith' },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      _id: '2',
      content: 'Yes, it\'s still available! Would you like to swap for something?',
      sender: { _id: '1', name: 'Jordan Smith' },
      receiver: { _id: otherUserId, name: otherUserId === '2' ? 'Sarah M.' : 'Emma K.' },
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
      _id: '3',
      content: 'Perfect! I have a silk blouse that might interest you.',
      sender: { _id: otherUserId, name: otherUserId === '2' ? 'Sarah M.' : 'Emma K.' },
      receiver: { _id: '1', name: 'Jordan Smith' },
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    }
  ];
  
  const otherUser = {
    id: otherUserId,
    name: otherUserId === '2' ? 'Sarah M.' : 'Emma K.',
    avatar: otherUserId === '2' ? 'SM' : 'EK',
    location: otherUserId === '2' ? 'NYC' : 'LA'
  };
  
  res.json({
    success: true,
    messages,
    otherUser
  });
});

app.post('/api/messages/send', auth, (req, res) => {
  const { receiverId, content, relatedItemId, messageType } = req.body;
  
  // Demo message creation
  const message = {
    _id: Date.now().toString(),
    content,
    sender: { _id: '1', name: 'Jordan Smith' },
    receiver: { _id: receiverId, name: receiverId === '2' ? 'Sarah M.' : 'Emma K.' },
    relatedItem: relatedItemId,
    messageType,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: message
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 