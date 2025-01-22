import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBar({ onFocus, onBlur }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  return (
    <div className="relative flex-1">
      <div
        className={`relative flex items-center transition-all duration-200 ${
          focused ? "ring-2 ring-green-500" : ""
        }`}
      >
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for food, locations, or stations..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none bg-gray-50 hover:bg-white transition-colors"
        />
      </div>

      {/* Search Suggestions Dropdown */}
      {focused && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-sm text-gray-500 font-medium px-3 py-2">
              Recent Searches
            </div>
            {/* Add recent searches items here */}
          </div>
        </div>
      )}
    </div>
  );
}
