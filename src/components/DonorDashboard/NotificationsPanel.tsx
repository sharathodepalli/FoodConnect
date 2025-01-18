import React, { useState } from 'react';
import { Bell, Clock, Check, AlertTriangle, X } from 'lucide-react';

interface Notification {
  id: number;
  type: 'expiring' | 'claimed' | 'alert';
  title: string;
  message: string;
  time: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'expiring':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'claimed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}