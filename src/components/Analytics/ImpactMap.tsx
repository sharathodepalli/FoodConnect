import React from "react";

export function ImpactMap() {
  const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <iframe
        title="Impact Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=${googleMapApiKey}&q=San+Francisco`}
        allowFullScreen
      />
    </div>
  );
}
