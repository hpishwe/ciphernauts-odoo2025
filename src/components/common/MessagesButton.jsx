import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react'; // Use Mail icon for messaging
import MessagesModal from './MessagesModal';

const MessagesButton = ({ user, addNotification }) => {
  const [showModal, setShowModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch unread count on component mount and periodically
  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      // Poll for new messages every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/messages/unread-count', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleOpenMessages = () => {
    setShowModal(true);
    // Reset unread count when opening messages
    setUnreadCount(0);
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={handleOpenMessages}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38b687 0%, #6db77a 100%)', // Green gradient
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(56, 182, 135, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(56, 182, 135, 0.35)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(56, 182, 135, 0.25)';
        }}
      >
        <Mail size={28} />
        {unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#ff4757',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {showModal && (
        <MessagesModal
          user={user}
          addNotification={addNotification}
          onClose={() => setShowModal(false)}
          onUnreadCountChange={setUnreadCount}
        />
      )}
    </>
  );
};

export default MessagesButton; 