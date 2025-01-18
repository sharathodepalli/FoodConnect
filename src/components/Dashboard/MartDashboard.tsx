import React, { useState } from 'react';
import { Package, Users, Leaf, Plus, TrendingUp, Clock, MapPin, Bell, Calendar } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { ListFoodModal } from '../ListFood/ListFoodModal';
import type { FoodListing } from '../../types/listing';

// Mock data for mart metrics
const martMetrics = {
  totalDonations: 245,
  itemsDonated: 1230,
  recipientsServed: 615,
  co2Saved: 820
};

// Mock data for inventory
const mockInventory: FoodListing[] = [
  {
    id: 1,
    title: "Fresh Produce Bundle",
    description: "Assorted fresh vegetables and fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    quantity: "10 bundles",
    distance: "0.0 miles away",
    expiresIn: "24 hours",
    category: "vegetables",
    pickupLocation: {
      address: "456 Market St, San Francisco, CA 94103",
      latitude: 37.7749,
      longitude: -122.4194
    },
    donor: {
      id: "m123",
      name: "Fresh Market",
      rating: 4.9,
      totalDonations: 245
    }
  }
];

// Mock data for scheduled pickups
const scheduledPickups = [
  {
    id: 1,
    items: "Fresh Produce Bundle",
    quantity: "5 bundles",
    pickupTime: "2024-03-15 14:00",
    recipient: "Local Food Bank",
    status: "Pending"
  },
  {
    id: 2,
    items: "Dairy Products",
    quantity: "20 items",
    pickupTime: "2024-03-15 15:30",
    recipient: "Community Center",
    status: "Confirmed"
  }
];

export function MartDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddListing = (listing: FoodListing) => {
    setInventory([...inventory, listing]);
    setIsAddModalOpen(false);
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleMarkAsDonated = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <DashboardLayout
      role="donor"
      title="Mart Dashboard"
      subtitle="Manage your surplus inventory and track donations"
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
            {martMetrics.totalDonations}
          </div>
          <div className="text-sm text-gray-600">Total Donations</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {martMetrics.itemsDonated}
          </div>
          <div className="text-sm text-gray-600">Items Donated</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {martMetrics.recipientsServed}
          </div>
          <div className="text-sm text-gray-600">Recipients Served</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {martMetrics.co2Saved}kg
          </div>
          <div className="text-sm text-gray-600">CO₂ Saved</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Inventory Management */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Inventory Management</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Categories</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="bakery">Bakery</option>
              </select>
            </div>

            <div className="space-y-4">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-4 h-4 mr-2" />
                          {item.quantity}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {item.expiresIn}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleMarkAsDonated(item.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Mark as Donated
                      </button>
                      <button
                        onClick={() => handleDeleteListing(item.id)}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {inventory.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Listed</h3>
                  <p className="text-gray-600">
                    Add items to your inventory to start donating.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Scheduled Pickups */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Pickups</h2>
            
            <div className="space-y-4">
              {scheduledPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{pickup.items}</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-4 h-4 mr-2" />
                          {pickup.quantity}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {pickup.pickupTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {pickup.recipient}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pickup.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pickup.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Donation Analytics</h2>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-600">Analytics visualization coming soon</p>
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