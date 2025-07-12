import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const SwapNearbyButton = ({ user, products, onProductClick }) => {
  const [showModal, setShowModal] = useState(false);

  if (!user) return null;

  // Filter products by user's location (case-insensitive)
  const nearbyProducts = products.filter(
    (item) =>
      item.uploader &&
      item.uploader.location &&
      user.location &&
      item.uploader.location.toLowerCase() === user.location.toLowerCase() &&
      String(item.uploader.id) !== String(user.id)
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          zIndex: 1002,
          background: 'linear-gradient(90deg, #4ade80, #22c55e)',
          color: '#fff',
          border: 'none',
          borderRadius: '24px',
          padding: '12px 24px',
          fontWeight: 700,
          fontSize: '1rem',
          boxShadow: '0 4px 16px rgba(34,197,94,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
      >
        <MapPin size={20} style={{ marginRight: 6 }} />
        Swap Nearby
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            maxWidth: 600,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(34,197,94,0.18)',
            padding: 32,
            position: 'relative',
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#888',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 style={{ margin: '0 0 18px 0', color: '#22c55e', fontWeight: 800, fontSize: '1.5rem' }}>
              Swap Nearby in {user.location}
            </h2>
            {nearbyProducts.length === 0 ? (
              <div style={{ color: '#888', textAlign: 'center', margin: '32px 0' }}>
                No products found near you yet. Check back soon!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {nearbyProducts.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#f8f9fa',
                      borderRadius: 12,
                      padding: 16,
                      boxShadow: '0 2px 8px #22c55e11',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                    />
                    <div style={{ fontWeight: 700, color: '#222', fontSize: '1rem', textAlign: 'center' }}>{item.title}</div>
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: 6 }}>
                      {item.points} pts • {item.condition}
                    </div>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        if (onProductClick) onProductClick(item);
                      }}
                      style={{
                        background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 18px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        marginTop: 6,
                      }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SwapNearbyButton; 