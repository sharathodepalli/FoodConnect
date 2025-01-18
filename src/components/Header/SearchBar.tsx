import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative flex-1 max-w-2xl mx-4">
      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search for food, locations, or stations..."
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}