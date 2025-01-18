import React from 'react';
import { Package, Users, Clock } from 'lucide-react';

interface MetricsPanelProps {
  metrics: {
    totalDonations: number;
    activeDonations: number;
    estimatedMeals: number;
  };
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-lg">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalDonations}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Estimated Meals</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.estimatedMeals}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Listings</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.activeDonations}</p>
          </div>
        </div>
      </div>
    </div>
  );
}