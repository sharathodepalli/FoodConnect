import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FoodCardProps {
  title: string;
  image: string;
  distance: string;
  expiresIn: string;
  category: string;
  id?: number;
}

export function FoodCard({ id, title, image, distance, expiresIn, category }: FoodCardProps) {
  const CardContent = () => (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-800">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{expiresIn}</span>
          </div>
        </div>

        <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Claim Now
        </button>
      </div>
    </>
  );

  if (id) {
    return (
      <Link to={`/listings/${id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <CardContent />
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <CardContent />
    </div>
  );
}