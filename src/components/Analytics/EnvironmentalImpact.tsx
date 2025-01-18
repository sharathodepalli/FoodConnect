import React from 'react';
import { Droplet, Zap, Trash2 } from 'lucide-react';

interface EnvironmentalImpactProps {
  data: {
    waterSaved: number;
    energySaved: number;
    wasteDiverted: number;
  };
}

export function EnvironmentalImpact({ data }: EnvironmentalImpactProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Environmental Impact
      </h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Droplet className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-600">Water Saved</div>
            <div className="text-xl font-semibold text-gray-900">
              {data.waterSaved.toLocaleString()} Liters
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-600">Energy Saved</div>
            <div className="text-xl font-semibold text-gray-900">
              {data.energySaved.toLocaleString()} kWh
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-600">Waste Diverted</div>
            <div className="text-xl font-semibold text-gray-900">
              {data.wasteDiverted.toLocaleString()} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}