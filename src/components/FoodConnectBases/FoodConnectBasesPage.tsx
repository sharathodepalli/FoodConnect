import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, Star, Package, Users, Leaf, ArrowRight, Building, Phone, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for bases
const bases = [
  {
    id: 1,
    name: "Downtown Food Hub",
    address: "123 Market Street, San Francisco, CA 94105",
    hours: "24/7",
    phone: "(415) 555-0123",
    email: "downtown@foodconnect.org",
    image: "https://images.unsplash.com/photo-1587244141530-6b6aceef93db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    stats: {
      mealsHandled: 5000,
      donorsServed: 120,
      volunteersActive: 45
    }
  },
  {
    id: 2,
    name: "Mission District Base",
    address: "456 Valencia St, San Francisco, CA 94103",
    hours: "6 AM - 10 PM",
    phone: "(415) 555-0124",
    email: "mission@foodconnect.org",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    stats: {
      mealsHandled: 3500,
      donorsServed: 85,
      volunteersActive: 30
    }
  }
];

export function FoodConnectBasesPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    hours: '24/7',
    storageCapacity: '',
    categories: [] as string[],
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your application! We will review it and get back to you soon.');
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            FoodConnect Bases
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            24-hour hubs ensuring food safety, convenience, and access for everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="group px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become a Base
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('find-bases')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find a Base
              <ChevronDown className="inline-block ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Heart of Food Redistribution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FoodConnect Bases serve as 24-hour storage hubs for food donations from restaurants, marts, events, and individuals. These bases ensure that food is safely stored and made accessible for delivery partners and volunteers to redistribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safe Storage</h3>
              <p className="text-gray-600">
                Temperature-controlled storage facilities ensuring food safety and quality
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Access</h3>
              <p className="text-gray-600">
                Round-the-clock operation for convenient drop-offs and pickups
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Hub</h3>
              <p className="text-gray-600">
                Connecting donors, volunteers, and recipients in your neighborhood
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Find Bases Section */}
      <div id="find-bases" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Find a Base Near You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bases.map((base) => (
              <div
                key={base.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-video relative">
                  <img
                    src={base.image}
                    alt={base.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{base.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      {base.address}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      {base.hours}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2" />
                      {base.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      {base.email}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {base.stats.mealsHandled.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Meals Handled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {base.stats.donorsServed.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Donors Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {base.stats.volunteersActive.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Active Volunteers</div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(base.address)}`, '_blank')}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Apply to Become a Base</h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours of Operation
                </label>
                <select
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="24/7">24/7</option>
                  <option value="daytime">6 AM - 10 PM</option>
                  <option value="custom">Custom Hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Capacity*
                </label>
                <textarea
                  required
                  value={formData.storageCapacity}
                  onChange={(e) => setFormData({ ...formData, storageCapacity: e.target.value })}
                  placeholder="Describe your available storage facilities (e.g., refrigerators, freezers, dry storage)"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Categories Accepted
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Bakery', 'Fruits', 'Vegetables', 'Meals', 'Dairy'].map((category) => (
                    <label
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                        formData.categories.includes(category)
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } border`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.categories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...formData.categories, category]
                            : formData.categories.filter(c => c !== category);
                          setFormData({ ...formData, categories: newCategories });
                        }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to become a FoodConnect Base?
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={4}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I agree to adhere to FoodConnect's food safety and hygiene standards
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}