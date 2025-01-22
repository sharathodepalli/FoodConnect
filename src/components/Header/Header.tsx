// src/components/Header/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { ListFoodModal } from "../ListFood/ListFoodModal";
import { useApp } from "../../context/AppContext";

export function Header() {
  const { state } = useApp();
  const [isListFoodModalOpen, setIsListFoodModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FoodConnect</span>
          </Link>

          <LocationSelector />
          <SearchBar />

          <div className="flex items-center space-x-4">
            {state.user ? (
              <>
                <button
                  onClick={() => setIsListFoodModalOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  List Food
                </button>
                <UserMenu />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isListFoodModalOpen && (
        <ListFoodModal
          isOpen={isListFoodModalOpen}
          onClose={() => setIsListFoodModalOpen(false)}
        />
      )}
    </header>
  );
}
