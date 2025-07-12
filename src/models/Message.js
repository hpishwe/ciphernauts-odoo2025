const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: false // Optional - for messages related to specific items
  },
  swapRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swap',
    required: false // Optional - for messages related to swap requests
  },
  isRead: {
    type: Boolean,
    default: false
  },
  messageType: {
    type: String,
    enum: ['general', 'swap_inquiry', 'swap_related', 'meetup_arrangement'],
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ receiver: 1, isRead: 1 });
messageSchema.index({ relatedItem: 1 });

// Virtual for conversation ID (unique identifier for a conversation between two users)
messageSchema.virtual('conversationId').get(function() {
  const users = [this.sender.toString(), this.receiver.toString()].sort();
  return `${users[0]}-${users[1]}`;
});

module.exports = mongoose.model('Message', messageSchema); 