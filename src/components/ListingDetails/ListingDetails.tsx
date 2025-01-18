import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ChevronLeft, MessageCircle, Navigation, Star } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { RelatedListings } from './RelatedListings';
import type { FoodListing } from '../../types/listing';

// Mock data for a single listing
const mockListing: FoodListing = {
  id: 1,
  title: "Fresh Artisan Bread Assortment",
  description: "A variety of freshly baked artisan bread including sourdough, whole wheat, and rye. Perfect for 2-3 families. All bread was baked this morning and is in excellent condition.",
  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486887396153-fa416526c108?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  ],
  quantity: "8 loaves",
  distance: "1.2 miles away",
  expiresIn: "Expires in 2 hours",
  category: "bakery",
  pickupLocation: {
    address: "123 Baker Street, San Francisco, CA 94110",
    latitude: 37.7749,
    longitude: -122.4194
  },
  donorInstructions: "Please bring your own bags. Ring doorbell upon arrival.",
  donor: {
    id: "d123",
    name: "City Bakery",
    rating: 4.8,
    totalDonations: 156
  }
};

export function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [listing, setListing] = useState<FoodListing | null>(null);

  useEffect(() => {
    // In a real app, fetch the listing data from your API
    // For now, we'll use mock data
    setListing(mockListing);
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          Loading...
        </div>
      </div>
    );
  }

  const handleClaim = async () => {
    setIsClaiming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, make an API call to claim the listing
    alert('Food claimed successfully! The donor will be notified.');
    setIsClaiming(false);
  };

  const handleContact = () => {
    // In a real app, open chat/messaging interface
    alert('Opening chat with donor...');
  };

  const handleGetDirections = () => {
    const { latitude, longitude } = listing.pickupLocation;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={listing.images?.[selectedImageIndex] || listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-[4/3] relative rounded-md overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">Time Left</span>
                </div>
                <p className="text-lg text-gray-900">{listing.expiresIn}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-medium">Distance</span>
                </div>
                <p className="text-lg text-gray-900">{listing.distance}</p>
              </div>
            </div>

            {/* Donor Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{listing.donor.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{listing.donor.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{listing.donor.totalDonations} donations</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{listing.donorInstructions}</p>
            </div>

            {/* Pickup Location */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">Pickup Location</h3>
              <p className="text-gray-600 mb-4">{listing.pickupLocation.address}</p>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <iframe
                  title="Pickup Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAzi8bvfT3IGMukv_78rd2dMskL86lSBHs&q=${listing.pickupLocation.latitude},${listing.pickupLocation.longitude}`}
                  allowFullScreen
                />
              </div>
              <button
                onClick={handleGetDirections}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isClaiming ? 'Claiming...' : 'Claim Now'}
              </button>
              <button
                onClick={handleContact}
                className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-green-600"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <RelatedListings category={listing.category} excludeId={listing.id} />
        </div>
      </div>
    </div>
  );
}