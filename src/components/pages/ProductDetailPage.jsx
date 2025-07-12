import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';

const ProductDetailPage = ({ products, user, addNotification, navigateTo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => String(p.id) === String(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUserItem, setSelectedUserItem] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  if (!product) return <div className="loading">Product not found.</div>;

  // User's own listings (excluding the current product)
  const userListings = user
    ? products.filter(
        (item) => String(item.uploader.id) === String(user.id) && String(item.id) !== String(product.id)
      )
    : [];

  const hasEnoughPoints = user && user.points >= product.points;

  const handleSwapClick = () => {
    if (!user) {
      addNotification('Please log in to swap.', 'error');
      navigate('/login');
      return;
    }
    if (userListings.length === 0 && !hasEnoughPoints) {
      addNotification('Please list a product to swap this.', 'error');
      navigate('/dashboard');
      return;
    }
    setShowSwapModal(true);
  };

  const handleConfirmSwap = async (type) => {
    try {
      console.log('Starting swap process for type:', type);
      
      let payload;
      if (type === 'points') {
        payload = {
          itemId: product.id,
          type: 'points',
          pointsOffered: product.points,
        };
      } else {
        payload = {
          itemId: product.id,
          type: 'swap',
          offeredItemId: selectedUserItem.id,
        };
      }
      
      console.log('Swap payload:', payload);
      
      // For demo purposes, we'll simulate the API call
      // In production, you would use the actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate API success (90% success rate for demo)
          if (Math.random() > 0.1) {
            resolve({ success: true });
          } else {
            reject(new Error('API Error'));
          }
        }, 1000);
      });
      
      console.log('Swap request successful, navigating to transaction page');
      addNotification('Swap request sent!', 'success');
      setShowSwapModal(false);
      
      // Navigate to transaction page with state
      navigate('/transaction', {
        state: {
          product,
          swapType: type,
          offeredItem: selectedUserItem || null,
          points: product.points
        }
      });
      
    } catch (err) {
      console.error('Swap request failed:', err);
      addNotification('Failed to send swap request. Please try again.', 'error');
    }
  };

  const handleSendMessage = async () => {
    try {
      console.log('Sending message to:', product.uploader.name);
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
          messageType: 'swap_inquiry'
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

  return (
    <div className="product-detail-page">
      <nav className="breadcrumb">
        <span>Home</span>
        <span> › </span>
        <span>Browse Items</span>
        <span> › </span>
        <span>{product.title}</span>
      </nav>
      <div className="product-main-section" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        {/* Main Product Image */}
        <div style={{ flex: '1 1 350px', maxWidth: 400 }}>
          <img 
            src={product.images[currentImageIndex]}
            alt={product.title}
            style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 12, border: '1px solid #eee' }}
          />
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.title + ' thumbnail ' + (idx + 1)}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: idx === currentImageIndex ? '2px solid #338e77' : '1px solid #ccc',
                  cursor: 'pointer',
                  boxShadow: idx === currentImageIndex ? '0 0 8px #338e7733' : 'none',
                  transition: 'border 0.2s, box-shadow 0.2s'
                }}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{product.title}</h2>
          <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: 8 }}>{product.category} &bull; {product.size} &bull; {product.condition}</div>
          <div style={{ fontWeight: 600, color: '#338e77', fontSize: '1.2rem', marginBottom: 8 }}>{product.points} pts</div>
          <div style={{ marginBottom: 16 }}>
            <strong>Description:</strong>
            <p style={{ margin: '8px 0 0 0', color: '#444', lineHeight: 1.6 }}>{product.description}</p>
          </div>
          
          {/* Seller Information */}
          <div style={{ 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '12px', 
            marginBottom: '16px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#338e77', fontSize: '1.1rem' }}>Seller Information</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
            {user && String(product.uploader.id) !== String(user.id) && (
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
                💬 Message Seller
              </button>
            )}
          </div>
          
          <div style={{ marginTop: 24 }}>
            {user && String(product.uploader.id) !== String(user.id) && (
              <>
                <button
                  className="btn btn-primary swap-btn-bright"
                  style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: 8, background: 'linear-gradient(90deg, #4ecdc4, #667eea)', color: '#fff', border: 'none', boxShadow: '0 2px 12px #667eea22', cursor: 'pointer', marginBottom: 8 }}
                  onClick={handleSwapClick}
                >
                  Swap
                </button>
                {showSwapModal && (
                  <div
                    className="modal"
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: 32,
                      boxShadow: '0 8px 40px #0003',
                      maxWidth: 420,
                      marginTop: 24,
                      color: '#222',
                      border: '1px solid #e0e0e0',
                      zIndex: 1000,
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <h3 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 18 }}>Choose how you want to swap:</h3>
                    {hasEnoughPoints && (
                      <button
                        className="btn btn-accent"
                        style={{
                          width: '100%',
                          marginBottom: 18,
                          padding: '0.7rem 0',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          borderRadius: 8,
                          background: 'linear-gradient(90deg, #fcb69f, #ffecd2)',
                          color: '#333',
                          border: 'none',
                          boxShadow: '0 2px 12px #fcb69f33',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleConfirmSwap('points')}
                      >
                        Swap with {product.points} Points
                      </button>
                    )}
                    {userListings.length > 0 && (
                      <>
                        <select
                          value={selectedUserItem ? selectedUserItem.id : ''}
                          onChange={e =>
                            setSelectedUserItem(
                              userListings.find(item => String(item.id) === e.target.value)
                            )
                          }
                          style={{
                            width: '100%',
                            marginBottom: 18,
                            padding: '0.7rem',
                            fontSize: '1rem',
                            borderRadius: 8,
                            border: '1px solid #ccc',
                            background: '#fafbfc',
                            color: '#222',
                            fontWeight: 500,
                            outline: 'none',
                          }}
                        >
                          <option value="">Select one of your items</option>
                          {userListings.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.title} ({item.points} pts)
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            padding: '0.7rem 0',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            borderRadius: 8,
                            background: 'linear-gradient(90deg, #667eea, #4ecdc4)',
                            color: '#fff',
                            border: 'none',
                            boxShadow: '0 2px 12px #667eea22',
                            cursor: selectedUserItem ? 'pointer' : 'not-allowed',
                            opacity: selectedUserItem ? 1 : 0.6,
                            marginBottom: 8,
                          }}
                          disabled={!selectedUserItem}
                          onClick={() => handleConfirmSwap('swap')}
                        >
                          Confirm Swap
                        </button>
                      </>
                    )}
                    <button
                      className="btn"
                      style={{
                        width: '100%',
                        padding: '0.7rem 0',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: 8,
                        background: '#f5f5f5',
                        color: '#333',
                        border: '1px solid #ccc',
                        marginTop: 4,
                        cursor: 'pointer',
                      }}
                      onClick={() => setShowSwapModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div style={{ marginTop: 'auto', color: '#666', fontSize: 14 }}>
            <div><strong>Tags:</strong> {product.tags && product.tags.join(', ')}</div>
            <div><strong>Status:</strong> {product.status}</div>
          </div>
        </div>
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
              Message {product.uploader.name}
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
              Send a message to discuss the swap or ask questions about this item.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Your Message:
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Hi! I'm interested in swapping for this item. Can you tell me more about it?"
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

export default ProductDetailPage;