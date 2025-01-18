import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function Recommendations() {
  const recommendations = [
    {
      title: 'Optimize Donation Times',
      description: 'Consider scheduling your donations between 2-4 PM for maximum impact.',
    },
    {
      title: 'Expand Categories',
      description: 'Your area has high demand for fresh vegetables. Consider adding more produce.',
    },
    {
      title: 'Increase Frequency',
      description: 'Regular small donations have better claim rates than large occasional ones.',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Personalized Recommendations
      </h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start p-4 bg-green-50 rounded-lg"
          >
            <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{rec.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700">
        View All Recommendations
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}