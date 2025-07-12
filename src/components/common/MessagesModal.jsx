import React, { useState, useEffect } from 'react';
import { X, Send, ArrowLeft, User, MapPin } from 'lucide-react';

const MessagesModal = ({ user, addNotification, onClose, onUnreadCountChange }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages/conversations', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
      } else {
        // addNotification('Failed to load conversations', 'error');
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // addNotification('Failed to load conversations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId) => {
    try {
      setLoadingMessages(true);
      const response = await fetch(`/api/messages/conversation/${otherUserId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        setSelectedConversation(data.otherUser);
      } else {
        addNotification('Failed to load messages', 'error');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      addNotification('Failed to load messages', 'error');
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          receiverId: selectedConversation.id,
          content: newMessage.trim(),
          messageType: 'general'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data.data]);
        setNewMessage('');
        // Refresh conversations to update last message
        fetchConversations();
      } else {
        addNotification('Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addNotification('Failed to send message', 'error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleConversationClick = (conversation) => {
    const otherUserId = conversation.otherUser.id;
    fetchMessages(otherUserId);
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '800px',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {selectedConversation ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleBackToConversations}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowLeft size={20} />
                </button>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {selectedConversation.avatar || selectedConversation.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#333' }}>
                    {selectedConversation.name}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    📍 {selectedConversation.location}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3 style={{ margin: 0, color: '#333' }}>Messages</h3>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {!selectedConversation ? (
            /* Conversations List */
            <div style={{ flex: 1, overflow: 'auto' }}>
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                  Loading conversations...
                </div>
              ) : conversations.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>No messages yet</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    Start a conversation by messaging someone about their items!
                  </p>
                </div>
              ) : (
                <div>
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleConversationClick(conversation)}
                      style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {conversation.otherUser.avatar || conversation.otherUser.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: '600', color: '#333' }}>
                            {conversation.otherUser.name}
                          </div>
                          <div style={{ color: '#999', fontSize: '0.8rem' }}>
                            {formatTime(conversation.lastMessage.createdAt)}
                          </div>
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}>
                          📍 {conversation.otherUser.location}
                        </div>
                        <div style={{ 
                          color: '#666', 
                          fontSize: '0.9rem', 
                          marginTop: '4px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {conversation.lastMessage.content}
                        </div>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div style={{
                          background: '#ff4757',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Messages View */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Messages List */}
              <div style={{ 
                flex: 1, 
                overflow: 'auto', 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {loadingMessages ? (
                  <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Start a conversation</h4>
                    <p style={{ margin: 0, color: '#666' }}>
                      Send a message to begin chatting!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      style={{
                        display: 'flex',
                        justifyContent: message.sender._id === user.id ? 'flex-end' : 'flex-start',
                        marginBottom: '8px'
                      }}
                    >
                      <div style={{
                        maxWidth: '70%',
                        padding: '12px 16px',
                        borderRadius: '18px',
                        background: message.sender._id === user.id 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#f0f0f0',
                        color: message.sender._id === user.id ? 'white' : '#333',
                        wordWrap: 'break-word'
                      }}>
                        <div style={{ marginBottom: '4px' }}>
                          {message.content}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          opacity: 0.7,
                          textAlign: message.sender._id === user.id ? 'right' : 'left'
                        }}>
                          {formatTime(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div style={{
                padding: '20px',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end'
              }}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    maxHeight: '120px',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  style={{
                    background: newMessage.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
                    border: 'none',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '50%',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px'
                  }}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesModal; 