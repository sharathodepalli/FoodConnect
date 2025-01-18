import React from 'react';
import type { FoodListing } from '../../types/listing';

interface MapViewProps {
  listings: FoodListing[];
}

export function MapView({ listings }: MapViewProps) {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <iframe
        title="Listings Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAzi8bvfT3IGMukv_78rd2dMskL86lSBHs&q=${listings[0]?.pickupLocation.latitude},${listings[0]?.pickupLocation.longitude}`}
        allowFullScreen
      />
    </div>
  );
}