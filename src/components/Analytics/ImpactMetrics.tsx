import React from 'react';
import { Package, Users, Leaf } from 'lucide-react';

interface ImpactMetricsProps {
  metrics: {
    totalDonations: number;
    mealsServed: number;
    co2Saved: number;
  };
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Package className="w-8 h-8" />
          <span className="text-sm">Total Donations</span>
        </div>
        <div className="text-4xl font-bold">
          {metrics.totalDonations.toLocaleString()}
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Users className="w-8 h-8" />
          <span className="text-sm">Meals Served</span>
        </div>
        <div className="text-4xl font-bold">
          {metrics.mealsServed.toLocaleString()}
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Leaf className="w-8 h-8" />
          <span className="text-sm">CO₂ Saved (kg)</span>
        </div>
        <div className="text-4xl font-bold">
          {metrics.co2Saved.toLocaleString()}
        </div>
      </div>
    </div>
  );
}