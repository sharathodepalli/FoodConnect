import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

export function Leaderboard() {
  const leaders = [
    {
      name: 'City Bakery',
      donations: 156,
      impact: '468 meals',
      avatar: 'https://plus.unsplash.com/premium_photo-1687904384427-d5e770bd644f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Fresh Market',
      donations: 134,
      impact: '402 meals',
      avatar: 'https://plus.unsplash.com/premium_photo-1687904384427-d5e770bd644f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Green Foods',
      donations: 112,
      impact: '336 meals',
      avatar: 'https://plus.unsplash.com/premium_photo-1687904384427-d5e770bd644f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-gray-200 relative"
          >
            {index === 0 && (
              <Trophy className="absolute top-4 right-4 w-6 h-6 text-yellow-400" />
            )}
            {index === 1 && (
              <Award className="absolute top-4 right-4 w-6 h-6 text-gray-400" />
            )}
            {index === 2 && (
              <Medal className="absolute top-4 right-4 w-6 h-6 text-orange-400" />
            )}
            <div className="flex items-center mb-4">
              <img
                src={leader.avatar}
                alt={leader.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <div className="font-medium text-gray-900">{leader.name}</div>
                <div className="text-sm text-gray-500">{leader.donations} donations</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Total Impact: {leader.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}