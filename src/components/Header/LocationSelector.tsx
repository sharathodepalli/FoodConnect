import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export function LocationSelector() {
  const [location, setLocation] = useState('San Francisco, CA');
  
  return (
    <div className="relative flex items-center">
      <MapPin className="w-5 h-5 text-green-600 absolute left-3" />
      <select 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <option value="San Francisco, CA">San Francisco, CA</option>
        <option value="Los Angeles, CA">Los Angeles, CA</option>
        <option value="New York, NY">New York, NY</option>
        <option value="Chicago, IL">Chicago, IL</option>
      </select>
    </div>
  );
}