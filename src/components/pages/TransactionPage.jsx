import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TransactionPage = ({ addNotification }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, swapType, offeredItem, points } = location.state || {};
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  console.log('TransactionPage - location.state:', location.state);
  console.log('TransactionPage - extracted data:', { product, swapType, offeredItem, points });

  const handleSendMessage = async () => {
    try {
      console.log('Sending message about swap to:', product.uploader.name);
      console.log('Message:', messageText);
      
      // Send message via API
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          receiverId: product.uploader.id,
          content: messageText.trim(),
          relatedItemId: product.id,
          messageType: 'swap_related'
        })
      });
      
      if (response.ok) {
        addNotification('Message sent successfully!', 'success');
        setShowMessageModal(false);
        setMessageText('');
      } else {
        const errorData = await response.json();
        addNotification(errorData.message || 'Failed to send message', 'error');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      addNotification('Failed to send message. Please try again.', 'error');
    }
  };

  if (!product) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h2>No transaction details found.</h2>
        <p style={{ color: '#666', marginBottom: 16 }}>This usually happens when you navigate directly to this page without going through a swap process.</p>
        <button className="btn btn-primary" onClick={() => navigate('/browse')}>Back to Browse</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px #0001', padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 16 }}>Swap Request Summary</h2>
      
      {/* Product Details */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
        <img src={product.images[0]} alt={product.title} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, border: '1px solid #eee' }} />
        <div>
          <h3 style={{ margin: 0 }}>{product.title}</h3>
          <div style={{ color: '#888', fontSize: 15 }}>{product.category} &bull; {product.size} &bull; {product.condition}</div>
          <div style={{ color: '#338e77', fontWeight: 600, marginTop: 8 }}>{product.points} pts</div>
        </div>
      </div>
      
      {/* Seller Information */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '16px', 
        borderRadius: '12px', 
        marginBottom: '24px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#338e77', fontSize: '1.1rem' }}>Seller Information</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #4ecdc4, #667eea)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {product.uploader.avatar}
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#333' }}>{product.uploader.name}</div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              📍 {product.uploader.location} • {product.uploader.points} points
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowMessageModal(true)}
          style={{
            background: 'none',
            border: '1px solid #338e77',
            color: '#338e77',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#338e77';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#338e77';
          }}
        >
          💬 Message Seller About Swap
        </button>
      </div>
      <div style={{ marginBottom: 18 }}>
        <strong>Swap Type:</strong> {swapType === 'points' ? 'Points' : 'Direct Swap'}
      </div>
      {swapType === 'swap' && offeredItem && (
        <div style={{ marginBottom: 18 }}>
          <strong>Your Offered Item:</strong>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
            <img src={offeredItem.images && offeredItem.images[0]} alt={offeredItem.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{offeredItem.title}</div>
              <div style={{ color: '#888', fontSize: 14 }}>{offeredItem.category} &bull; {offeredItem.size} &bull; {offeredItem.condition}</div>
              <div style={{ color: '#338e77', fontWeight: 500 }}>{offeredItem.points} pts</div>
            </div>
          </div>
        </div>
      )}
      {swapType === 'points' && (
        <div style={{ marginBottom: 18 }}>
          <strong>Points Used:</strong> {points}
        </div>
      )}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        <button className="btn" style={{ marginLeft: 16 }} onClick={() => navigate('/browse')}>Back to Browse</button>
      </div>
      
      {/* Message Modal */}
      {showMessageModal && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>
              Message {product.uploader.name} About Swap
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
              Send a message to discuss the swap details, arrange meeting location, or ask questions.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Your Message:
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Hi! I just sent a swap request for your item. Can we discuss the details and arrange a meeting location?"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
                style={{
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  color: '#666',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                style={{
                  background: messageText.trim() ? '#338e77' : '#ccc',
                  border: 'none',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: messageText.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;