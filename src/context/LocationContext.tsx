import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the location type
export interface Location {
  latitude: number | null;
  longitude: number | null;
  address: string;
}

// Define the context type
interface LocationContextType {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Provider component
export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    address: "",
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
