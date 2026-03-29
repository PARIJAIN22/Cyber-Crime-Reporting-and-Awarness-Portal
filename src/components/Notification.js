import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './Notification.css';

function Notification() {
  const { notifications, removeNotification } = useApp();

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        removeNotification(notifications[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container" role="alert" aria-live="polite">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type || 'info'}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="notification-icon" aria-hidden="true">
            {notification.type === 'success' && '✅'}
            {notification.type === 'error' && '❌'}
            {notification.type === 'warning' && '⚠️'}
            {notification.type === 'info' && 'ℹ️'}
          </div>
          <div className="notification-content">
            <p className="notification-message">{notification.message}</p>
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notification;
