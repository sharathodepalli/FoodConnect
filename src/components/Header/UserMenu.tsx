import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  BarChart2,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationsPanel } from '../common/NotificationsPanel';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

export function UserMenu() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { signOut } = useSupabaseAuth();
  const { notifications, clearAllNotifications, removeNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-400 hover:text-gray-500"
        >
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>

          <div className="py-2">
            <Link
              to={`/${user.role}/dashboard`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <BarChart2 className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Help
            </Link>
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onClearAll={clearAllNotifications}
          onRemove={removeNotification}
        />
      )}
    </div>
  );
}