import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ListFoodModal } from '../ListFood/ListFoodModal';

export function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [isListFoodModalOpen, setIsListFoodModalOpen] = useState(false);

  const handleFindFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/explore?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Reducing Food Waste,<br className="hidden sm:block" /> One Meal at a Time
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join FoodConnect to connect surplus food with those in need
        </p>

        {/* Location Search */}
        <form onSubmit={handleFindFood} className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location to find food near you"
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-lg text-gray-900 placeholder-gray-500"
            />
          </div>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsListFoodModalOpen(true)}
            className="px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            List Food
          </button>
          <button
            onClick={handleFindFood}
            className="px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Find Food Near Me
          </button>
        </div>
      </div>

      {/* List Food Modal */}
      <ListFoodModal
        isOpen={isListFoodModalOpen}
        onClose={() => setIsListFoodModalOpen(false)}
      />
    </div>
  );
}