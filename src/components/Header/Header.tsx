import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocationSelector } from './LocationSelector';
import { SearchBar } from './SearchBar';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { AuthButtons } from '../Auth/AuthButtons';
import { ListFoodModal } from '../ListFood/ListFoodModal';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user } = useAuth();
  const [isListFoodModalOpen, setIsListFoodModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Upper Header */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FoodConnect</span>
          </Link>

          <LocationSelector />
          <SearchBar />

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={() => setIsListFoodModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
              >
                List Food
              </button>
            )}
            {user ? <UserMenu /> : <AuthButtons />}
          </div>
        </div>

        {/* Navigation */}
        <div className="h-12 flex items-center">
          <Navigation userRole={user?.role ?? null} />
        </div>
      </div>

      {/* List Food Modal */}
      <ListFoodModal
        isOpen={isListFoodModalOpen}
        onClose={() => setIsListFoodModalOpen(false)}
      />
    </header>
  );
}