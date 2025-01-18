import React from 'react';

export function ImpactMap() {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <iframe
        title="Impact Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAzi8bvfT3IGMukv_78rd2dMskL86lSBHs&q=San+Francisco"
        allowFullScreen
      />
    </div>
  );
}