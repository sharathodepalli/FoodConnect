/// <reference types="google.maps" />

import React, { useState, useEffect } from "react";

// Declare the google property on the window object
declare global {
  interface Window {
    google: typeof google;
  }
}
import { MapPin } from "lucide-react";

export function LocationSelector() {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState("");
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
                setCurrentLocation(userLocation);
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
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setLocation(value);

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
    setLocation(suggestion);
    setSuggestions([]);
    setDropdownVisible(false);

    // Save to previously selected locations
    setPreviousLocations((prev) => {
      const updated = [...new Set([suggestion, ...prev])]; // Ensure no duplicates
      return updated.slice(0, 5); // Keep only the last 5 locations
    });
  };

  const handleUseCurrentLocation = (): void => {
    if (currentLocation) {
      handleSuggestionClick(currentLocation);
    }
  };

  const toggleDropdown = (): void => {
    setDropdownVisible((visible) => !visible);
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-md">
      {/* Input Field */}
      <div className="relative flex items-center w-full">
        <MapPin className="w-5 h-5 text-green-600 absolute left-3" />
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          // onClick={toggleDropdown}
          // onClick={() => setDropdownVisible(true)} // Show dropdown on click
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
          {/* Use Current Location */}
          {currentLocation && (
            <li
              onClick={handleUseCurrentLocation}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-600"
            >
              Use Current Location
            </li>
          )}

          {/* Previously Used Locations */}
          {previousLocations.length > 0 && (
            <>
              <li className="px-4 py-2 text-gray-500 font-semibold">
                Previous Locations
              </li>
              {previousLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(location)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {truncateText(location, 50)}
                </li>
              ))}
            </>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <>
              <li className="px-4 py-2 text-gray-500 font-semibold">
                Suggestions
              </li>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {truncateText(suggestion, 50)}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
