import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryBreakdownProps {
  data: Record<string, number>;
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const chartData = {
    labels: Object.keys(data).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#16a34a',
          '#2563eb',
          '#d97706',
          '#dc2626',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Category Distribution
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
}