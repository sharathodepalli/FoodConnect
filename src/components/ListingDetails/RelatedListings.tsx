import React from 'react';
import { FoodCard } from '../Listings/FoodCard';
import type { FoodListing } from '../../types/listing';

// Mock data for related listings
const mockRelatedListings: FoodListing[] = [
  {
    id: 2,
    title: "Sourdough Bread Bundle",
    image: "https://images.unsplash.com/photo-1486887396153-fa416526c108?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    distance: "1.8 miles away",
    expiresIn: "Expires in 3 hours",
    category: "bakery",
    description: "",
    quantity: "",
    pickupLocation: {
      address: "",
      latitude: 0,
      longitude: 0
    },
    donor: {
      id: "",
      name: "",
      rating: 0,
      totalDonations: 0
    }
  },
  {
    id: 3,
    title: "Assorted Pastries",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    distance: "2.1 miles away",
    expiresIn: "Expires in 4 hours",
    category: "bakery",
    description: "",
    quantity: "",
    pickupLocation: {
      address: "",
      latitude: 0,
      longitude: 0
    },
    donor: {
      id: "",
      name: "",
      rating: 0,
      totalDonations: 0
    }
  },
  {
    id: 4,
    title: "Fresh Baguettes",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    distance: "0.9 miles away",
    expiresIn: "Expires in 2 hours",
    category: "bakery",
    description: "",
    quantity: "",
    pickupLocation: {
      address: "",
      latitude: 0,
      longitude: 0
    },
    donor: {
      id: "",
      name: "",
      rating: 0,
      totalDonations: 0
    }
  }
];

interface RelatedListingsProps {
  category: string;
  excludeId: number;
}

export function RelatedListings({ category, excludeId }: RelatedListingsProps) {
  // In a real app, fetch related listings based on category and current listing ID
  const relatedListings = mockRelatedListings.filter(listing => 
    listing.category === category && listing.id !== excludeId
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedListings.map((listing) => (
        <FoodCard
          key={listing.id}
          title={listing.title}
          image={listing.image}
          distance={listing.distance}
          expiresIn={listing.expiresIn}
          category={listing.category}
        />
      ))}
    </div>
  );
}