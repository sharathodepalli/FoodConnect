/// <reference types="google.maps" />

import React, { useState, useEffect } from "react";
import { useLocation } from "../../context/LocationContext"; // Import the context
import { MapPin } from "lucide-react";

// Declare the google property on the window object
declare global {
  interface Window {
    google: typeof google;
  }
}

export function LocationSelector() {
  const { location, setLocation } = useLocation(); // Access context
  console.log("fetched lat: ", location.latitude);
  
  const [inputValue, setInputValue] = useState(""); // Local input state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [previousLocations, setPreviousLocations] = useState<string[]>([]);

  const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const loadGoogleMapsScript = () => {
    const existingScript = document.getElementById("googleMaps");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`;
      script.id = "googleMaps";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Google Maps script loaded successfully.");
      };

      script.onerror = () => {
        console.error("Failed to load Google Maps script.");
      };
    }
  };

  useEffect(() => {
    loadGoogleMapsScript();

    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus
            ) => {
              if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results[0]
              ) {
                const userLocation = results[0].formatted_address;
                location.latitude = latitude;
                location.longitude = longitude;
                location.address = userLocation;
                // setLocation({ latitude, longitude, address: userLocation });
                console.log("Fetched user location: ", userLocation);
                console.log("Fetched user coordinates: ", latitude, longitude);
                
                
              } else {
                console.error("Geocoding failed: ", status);
              }
            }
          );
        },
        (error) => {
          console.error("Error fetching current location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    // Fetch suggestions
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: value, types: ["geocode"] },
      (
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions.map((p) => p.description));
          setDropdownVisible(true); // Ensure dropdown is visible
        } else {
          setSuggestions([]); // Clear suggestions if no matches
        }
      }
    );
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setInputValue(suggestion);
    setSuggestions([]);
    setDropdownVisible(false);

    // Use Places API to fetch coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: suggestion }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results) {
        const location = results[0].geometry.location;
        setLocation({
          latitude: location.lat(),
          longitude: location.lng(),
          address: suggestion,
        }); // Update context
      } else {
        console.error("Failed to fetch coordinates for suggestion:", status);
      }
    });

    // Save to previously selected locations
    setPreviousLocations((prev) => {
      const updated = [...new Set([suggestion, ...prev])]; // Ensure no duplicates
      return updated.slice(0, 5); // Keep only the last 5 locations
    });
  };

  const toggleDropdown = (): void => {
    setDropdownVisible((visible) => !visible);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-md">
      {/* Input Field */}
      <div className="relative flex items-center w-full">
        <MapPin className="w-5 h-5 text-green-600 absolute left-3" />
        <input
          type="text"
          value={location.address || inputValue}
          onChange={handleInputChange}
          onClick={() => {
            toggleDropdown();
            setDropdownVisible(true);
          }}
          placeholder="Search for a location"
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer hover:bg-gray-50 transition-colors w-full"
        />
      </div>

      {/* Dropdown */}
      {dropdownVisible && (
        <ul className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
