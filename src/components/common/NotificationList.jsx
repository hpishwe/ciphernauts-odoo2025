import React from 'react';
import { X } from 'lucide-react';

const NotificationList = ({ notifications, setNotifications }) => {
  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotifications(prev => 
              prev.filter(n => n.id !== notification.id)
            )}
            className="notification-close"
          >
            <X className="icon" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList; 