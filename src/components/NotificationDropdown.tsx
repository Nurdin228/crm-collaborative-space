
import React, { useState, useRef, useEffect } from 'react';
import { Bell, MailPlus, Trello, FileText, Check } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import { format } from 'date-fns';

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MailPlus className="w-5 h-5 text-blue-500" />;
      case 'kanban':
        return <Trello className="w-5 h-5 text-green-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // Here you could add navigation to the relevant page based on notification type
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-crm-dark-gray hover:text-crm-red transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-crm-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-crm-dark-gray">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-crm-red hover:text-crm-red/80 flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-crm-dark-gray' : 'text-crm-dark-gray/80'}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-crm-gray">
                            {format(notification.timestamp, 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-xs text-crm-dark-gray/70 mt-1">
                          {notification.message}
                        </p>
                        {notification.sender && (
                          <div className="text-xs text-crm-gray mt-1">
                            From: {notification.sender}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-crm-dark-gray/60">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
