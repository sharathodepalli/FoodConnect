import React, { useState } from 'react';
import { Package, Users, Clock, Plus, Search, Filter, MapPin, Bell } from 'lucide-react';
import { MetricsPanel } from './MetricsPanel';
import { ListingsTable } from './ListingsTable';
import { AddListingModal } from './AddListingModal';
import { NotificationsPanel } from './NotificationsPanel';
import { DonorProfile } from './DonorProfile';
import { AnalyticsPanel } from './AnalyticsPanel';
import { MapView } from './MapView';
import type { FoodListing } from '../../types/listing';

// Mock user data
const mockUser = {
  name: "City Bakery",
  avatar: "https://plus.unsplash.com/premium_photo-1687904384427-d5e770bd644f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  totalDonations: 156,
  rating: 4.8,
  joinedDate: "Jan 2023",
  impactMetrics: {
    mealsProvided: 468,
    recipientsHelped: 234,
    co2Saved: 520
  }
};

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'expiring' as const,
    title: 'Listing Expiring Soon',
    message: 'Your "Fresh Bread Assortment" listing expires in 1 hour.',
    time: '1 hour ago'
  },
  {
    id: 2,
    type: 'claimed' as const,
    title: 'Listing Claimed',
    message: 'Your "Organic Fruit Basket" has been claimed.',
    time: '2 hours ago'
  },
  {
    id: 3,
    type: 'alert' as const,
    title: 'New Feature Available',
    message: 'You can now schedule recurring donations!',
    time: '1 day ago'
  }
];

// Mock data for active listings
const mockActiveListings: FoodListing[] = [
  {
    id: 1,
    title: "Fresh Artisan Bread Assortment",
    description: "Freshly baked artisan bread variety",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    quantity: "8 loaves",
    distance: "1.2 miles away",
    expiresIn: "2 hours",
    category: "bakery",
    pickupLocation: {
      address: "123 Baker Street, San Francisco, CA 94110",
      latitude: 37.7749,
      longitude: -122.4194
    },
    donor: {
      id: "d123",
      name: "City Bakery",
      rating: 4.8,
      totalDonations: 156
    }
  },
  {
    id: 2,
    title: "Organic Fruit Basket",
    description: "Fresh organic fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    quantity: "2 baskets",
    distance: "0.8 miles away",
    expiresIn: "4 hours",
    category: "fruits",
    pickupLocation: {
      address: "456 Market St, San Francisco, CA 94103",
      latitude: 37.7749,
      longitude: -122.4194
    },
    donor: {
      id: "d123",
      name: "City Bakery",
      rating: 4.8,
      totalDonations: 156
    }
  }
];

// Mock data for past listings
const mockPastListings: FoodListing[] = [
  {
    id: 3,
    title: "Restaurant Surplus Meals",
    description: "Surplus prepared meals",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    quantity: "10 meals",
    distance: "2.1 miles away",
    expiresIn: "Expired",
    category: "meals",
    pickupLocation: {
      address: "789 Restaurant Row, San Francisco, CA 94110",
      latitude: 37.7749,
      longitude: -122.4194
    },
    donor: {
      id: "d123",
      name: "City Bakery",
      rating: 4.8,
      totalDonations: 156
    }
  }
];

export function DonorDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeListings, setActiveListings] = useState(mockActiveListings);
  const [pastListings, setPastListings] = useState(mockPastListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAddListing = (newListing: FoodListing) => {
    setActiveListings([...activeListings, newListing]);
    setIsAddModalOpen(false);
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setActiveListings(activeListings.filter(listing => listing.id !== id));
    }
  };

  const handleMarkAsClaimed = (id: number) => {
    const listing = activeListings.find(l => l.id === id);
    if (listing) {
      setActiveListings(activeListings.filter(l => l.id !== id));
      setPastListings([{ ...listing, expiresIn: 'Claimed' }, ...pastListings]);
    }
  };

  const handleBulkAction = (action: 'claim' | 'delete') => {
    if (action === 'claim') {
      const claimedListings = activeListings.filter(l => selectedListings.includes(l.id));
      setActiveListings(activeListings.filter(l => !selectedListings.includes(l.id)));
      setPastListings([...claimedListings.map(l => ({ ...l, expiresIn: 'Claimed' })), ...pastListings]);
    } else if (action === 'delete' && window.confirm('Are you sure you want to delete these listings?')) {
      setActiveListings(activeListings.filter(l => !selectedListings.includes(l.id)));
    }
    setSelectedListings([]);
  };

  // Calculate metrics
  const metrics = {
    totalDonations: activeListings.length + pastListings.length,
    activeDonations: activeListings.length,
    estimatedMeals: (activeListings.length + pastListings.length) * 3,
  };

  // Filter active listings based on search and category
  const filteredActiveListings = activeListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your food donations and track your impact
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-500"
            >
              <Bell className="w-6 h-6" />
              {mockNotifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Listing
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile and Analytics */}
          <div className="lg:col-span-1 space-y-8">
            <DonorProfile user={mockUser} />
          </div>

          {/* Right Column - Listings and Metrics */}
          <div className="lg:col-span-3 space-y-8">
            {/* Metrics Panel */}
            <MetricsPanel metrics={metrics} />

            {/* Analytics Panel */}
            <AnalyticsPanel
              activeListings={activeListings}
              pastListings={pastListings}
            />

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search listings..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Categories</option>
                  <option value="bakery">Bakery</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="meals">Prepared Meals</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${
                      viewMode === 'list'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-md ${
                      viewMode === 'map'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {selectedListings.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {selectedListings.length} items selected
                  </p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleBulkAction('claim')}
                      className="px-3 py-1 text-sm text-green-600 hover:text-green-700"
                    >
                      Mark as Claimed
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Listings View */}
            {viewMode === 'list' ? (
              <div className="space-y-6">
                {/* Active Listings */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Active Listings
                  </h2>
                  <ListingsTable
                    listings={filteredActiveListings}
                    onDelete={handleDeleteListing}
                    onMarkAsClaimed={handleMarkAsClaimed}
                    type="active"
                  />
                </div>

                {/* Past Listings */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Past Listings
                  </h2>
                  <ListingsTable
                    listings={pastListings}
                    type="past"
                  />
                </div>
              </div>
            ) : (
              <MapView listings={filteredActiveListings} />
            )}
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddListing}
      />

      {showNotifications && (
        <NotificationsPanel notifications={mockNotifications} />
      )}
    </div>
  );
}