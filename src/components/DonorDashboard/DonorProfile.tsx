import React from 'react';
import { Star, Calendar } from 'lucide-react';

interface DonorProfileProps {
  user: {
    name: string;
    avatar: string;
    totalDonations: number;
    rating: number;
    joinedDate: string;
    impactMetrics: {
      mealsProvided: number;
      recipientsHelped: number;
      co2Saved: number;
    };
  };
}

export function DonorProfile({ user }: DonorProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <div className="flex items-center text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{user.rating}</span>
            <span className="mx-2">•</span>
            <span>{user.totalDonations} donations</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          Member since {user.joinedDate}
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Meals Provided</div>
            <div className="text-2xl font-semibold text-gray-900">
              {user.impactMetrics.mealsProvided}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Recipients Helped</div>
            <div className="text-2xl font-semibold text-gray-900">
              {user.impactMetrics.recipientsHelped}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">CO₂ Saved (kg)</div>
            <div className="text-2xl font-semibold text-gray-900">
              {user.impactMetrics.co2Saved}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}