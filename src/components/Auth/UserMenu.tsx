import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Bell,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

export function UserMenu() {
  const { state } = useApp();
  const { signOut } = useSupabaseAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{state.user?.name}</span>
          <span className="text-xs text-gray-500">{state.user?.role}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="w-4 h-4 inline mr-2" />
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}