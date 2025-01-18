import React from 'react';
import { Filter } from 'lucide-react';
import { SearchBar } from './SearchBar';
import type { FoodCategory, DistanceFilter, ExpirationFilter } from '../../types/listing';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  foodType: FoodCategory;
  onFoodTypeChange: (value: FoodCategory) => void;
  distance: DistanceFilter;
  onDistanceChange: (value: DistanceFilter) => void;
  expiration: ExpirationFilter;
  onExpirationChange: (value: ExpirationFilter) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  foodType,
  onFoodTypeChange,
  distance,
  onDistanceChange,
  expiration,
  onExpirationChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-28 bg-white border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center text-gray-700">
            <Filter className="w-5 h-5 mr-2" />
            <span className="font-medium">Filters:</span>
          </div>

          {/* Food Type Filter */}
          <select
            value={foodType}
            onChange={(e) => onFoodTypeChange(e.target.value as FoodCategory)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Food Types</option>
            <option value="bakery">Bakery</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="meals">Prepared Meals</option>
          </select>

          {/* Distance Filter */}
          <select
            value={distance}
            onChange={(e) => onDistanceChange(e.target.value as DistanceFilter)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="1">Within 1 mile</option>
            <option value="5">Within 5 miles</option>
            <option value="10">Within 10 miles</option>
            <option value="20">Within 20 miles</option>
          </select>

          {/* Expiration Filter */}
          <select
            value={expiration}
            onChange={(e) => onExpirationChange(e.target.value as ExpirationFilter)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="2">Expires in 2 hours</option>
            <option value="4">Expires in 4 hours</option>
            <option value="8">Expires in 8 hours</option>
            <option value="24">Expires in 24 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
}