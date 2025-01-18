import React from 'react';
import { Bell, Check, AlertTriangle, Info, X } from 'lucide-react';
import type { Notification } from '../../hooks/useNotifications';

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onClearAll: () => void;
  onRemove: (id: number) => void;
}

export function NotificationsPanel({
  notifications,
  onClose,
  onClearAll,
  onRemove
}: NotificationsPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed top-16 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
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
                    {new Date(notification.time).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(notification.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClearAll}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
}