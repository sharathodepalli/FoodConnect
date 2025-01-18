import React, { useState } from 'react';
import { Package, Users, Leaf, Plus, TrendingUp, Clock, MapPin, Bell } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { ListFoodModal } from '../ListFood/ListFoodModal';
import type { FoodListing } from '../../types/listing';

// Mock data for restaurant metrics
const restaurantMetrics = {
  totalDonations: 156,
  mealsProvided: 468,
  co2Saved: 520,
  activeListings: 3
};

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
  }
];

export function RestaurantDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeListings, setActiveListings] = useState(mockActiveListings);

  const handleAddListing = (listing: FoodListing) => {
    setActiveListings([...activeListings, listing]);
    setIsAddModalOpen(false);
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setActiveListings(activeListings.filter(listing => listing.id !== id));
    }
  };

  const handleMarkAsClaimed = (id: number) => {
    setActiveListings(activeListings.filter(listing => listing.id !== id));
  };

  return (
    <DashboardLayout
      role="donor"
      title="Restaurant Dashboard"
      subtitle="Manage your food donations and track your impact"
    >
      {/* Quick Actions */}
      <div className="mb-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Listing
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {restaurantMetrics.totalDonations}
          </div>
          <div className="text-sm text-gray-600">Total Donations</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {restaurantMetrics.mealsProvided}
          </div>
          <div className="text-sm text-gray-600">Meals Provided</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {restaurantMetrics.co2Saved}kg
          </div>
          <div className="text-sm text-gray-600">CO₂ Saved</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {restaurantMetrics.activeListings}
          </div>
          <div className="text-sm text-gray-600">Active Listings</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active Listings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Listings</h2>

            <div className="space-y-4">
              {activeListings.map((listing) => (
                <div
                  key={listing.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{listing.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-4 h-4 mr-2" />
                          {listing.quantity}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {listing.expiresIn}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {listing.pickupLocation.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleMarkAsClaimed(listing.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Mark Claimed
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {activeListings.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Listings</h3>
                  <p className="text-gray-600">
                    Add your first listing to start making a difference.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Analytics and Impact */}
        <div className="space-y-8">
          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Donation Analytics</h2>
            
            {/* Add charts and analytics here */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-600">Analytics visualization coming soon</p>
            </div>
          </div>

          {/* Community Impact */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Community Impact</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  "Thanks to your donations, we were able to serve 50 families this week!"
                </p>
                <p className="mt-2 text-xs text-green-600">
                  - Local Food Bank
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List Food Modal */}
      <ListFoodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddListing}
      />
    </DashboardLayout>
  );
}