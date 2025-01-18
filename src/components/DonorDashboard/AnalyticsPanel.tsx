import React from 'react';
import type { FoodListing } from '../../types/listing';

interface AnalyticsPanelProps {
  activeListings: FoodListing[];
  pastListings: FoodListing[];
}

export function AnalyticsPanel({ activeListings, pastListings }: AnalyticsPanelProps) {
  // Calculate category breakdown
  const allListings = [...activeListings, ...pastListings];
  const categoryBreakdown = allListings.reduce((acc, listing) => {
    acc[listing.category] = (acc[listing.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Category Breakdown */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Donations by Category</h3>
          <div className="space-y-2">
            {Object.entries(categoryBreakdown).map(([category, count]) => (
              <div key={category} className="flex items-center">
                <div className="w-24 capitalize">{category}</div>
                <div className="flex-1 mx-2">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${(count / allListings.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <div className="w-12 text-right text-sm text-gray-600">
                  {Math.round((count / allListings.length) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Weekly Activity</h3>
          <div className="h-40 flex items-end space-x-2">
            {Array.from({ length: 7 }).map((_, index) => {
              const height = Math.random() * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-green-100 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Stats */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Monthly Impact</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Donations</div>
              <div className="text-2xl font-semibold text-gray-900">
                {allListings.length}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Success Rate</div>
              <div className="text-2xl font-semibold text-gray-900">
                {Math.round((pastListings.length / allListings.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}