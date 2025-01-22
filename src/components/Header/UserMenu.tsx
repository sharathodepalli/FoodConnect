import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown,
  UserCircle,
  HelpCircle,
  History,
  LogIn,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { NotificationsPanel } from "../common/NotificationsPanel";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { Link, useNavigate } from "react-router-dom";
import type { User as UserType } from "../../types/user";

interface UserMenuProps {
  user: UserType | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const { state, dispatch } = useApp();
  const { signOut } = useSupabaseAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // If user is not authenticated, show sign in/sign up buttons
  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/signin"
          className="text-sm font-medium text-gray-700 hover:text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Notifications Button - Only show for authenticated users */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowUserMenu(false);
          }}
          className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {state.notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {state.notifications.length}
            </span>
          )}
        </button>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            <NotificationsPanel
              notifications={state.notifications}
              onClose={() => setShowNotifications(false)}
              onRemove={(id) =>
                dispatch({ type: "REMOVE_NOTIFICATION", payload: id })
              }
              onClearAll={() => dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" })}
            />
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => {
            setShowUserMenu(!showUserMenu);
            setShowNotifications(false);
          }}
          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="User menu"
        >
          <div className="flex items-center space-x-2">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
            )}
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user.role}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </button>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                <UserCircle className="w-4 h-4 mr-3" />
                Profile
              </Link>

              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Link>

              {user.role === "recipient" && (
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <History className="w-4 h-4 mr-3" />
                  Order History
                </Link>
              )}

              <Link
                to="/help"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help Center
              </Link>

              <div className="border-t border-gray-200 mt-1">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
