import React, { useState } from 'react';
import { Package, Users, MapPin, Clock, Bell, ChevronRight, Star, Calendar } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { Link } from 'react-router-dom';
import type { FoodListing } from '../../types/listing';

// Mock data for individual metrics
const individualMetrics = {
  mealsClaimed: 24,
  communitiesHelped: 5,
  averageDistance: 2.1,
  co2Saved: 45
};

// Mock data for available listings
const availableListings: FoodListing[] = [
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

// Mock data for claim history
const claimHistory = [
  {
    id: 1,
    title: "Fresh Bread Bundle",
    donor: "City Bakery",
    date: "2024-03-10",
    quantity: "5 loaves",
    rating: 5
  },
  {
    id: 2,
    title: "Organic Fruit Basket",
    donor: "Fresh Market",
    date: "2024-03-08",
    quantity: "2 baskets",
    rating: 4
  }
];

export function IndividualDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <DashboardLayout
      role="recipient"
      title="Welcome Back, John!"
      subtitle="Here's how you've helped reduce food waste in your community"
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {individualMetrics.mealsClaimed}
          </div>
          <div className="text-sm text-gray-600">Meals Claimed</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {individualMetrics.communitiesHelped}
          </div>
          <div className="text-sm text-gray-600">Communities Helped</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {individualMetrics.averageDistance}mi
          </div>
          <div className="text-sm text-gray-600">Average Distance</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {individualMetrics.co2Saved}kg
          </div>
          <div className="text-sm text-gray-600">CO₂ Saved</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Available Listings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Near You</h2>
              <Link
                to="/explore"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {availableListings.map((listing) => (
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
                          {listing.distance}
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      Claim Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Claim History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Claim History</h2>
            
            <div className="space-y-4">
              {claimHistory.map((claim) => (
                <div
                  key={claim.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{claim.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-4 h-4 mr-2" />
                          {claim.quantity}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {claim.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-2 text-yellow-400" />
                          {claim.rating}/5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Bakery', 'Fruits', 'Vegetables', 'Meals'].map((category) => (
                    <label
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                        selectedCategory === category.toLowerCase()
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } border`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={() => setSelectedCategory(category.toLowerCase())}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Distance
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="1">Within 1 mile</option>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Favorite Donors */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Donors</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80"
                  alt="City Bakery"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">City Bakery</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    4.8 • 156 donations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}