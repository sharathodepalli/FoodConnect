// src/components/Header/UserMenu.tsx
import { useState } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { NotificationsPanel } from "../common/NotificationsPanel";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

export function UserMenu() {
  const { state, dispatch } = useApp();
  const { signOut } = useSupabaseAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleRemoveNotification = (id: number) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const handleClearAllNotifications = () => {
    dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" });
  };

  return (
    <div className="relative">
      {/* Notifications Button */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {state.notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {state.notifications.length}
          </span>
        )}
      </button>

      {/* User Menu */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {state.user?.name}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {state.user?.role}
          </span>
        </div>
        <div className="relative">
          {state.user?.avatar ? (
            <img
              src={state.user.avatar}
              alt={state.user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        <div className="py-1">
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          notifications={state.notifications}
          onClose={() => setShowNotifications(false)}
          onRemove={handleRemoveNotification}
          onClearAll={handleClearAllNotifications}
        />
      )}
    </div>
  );
}
