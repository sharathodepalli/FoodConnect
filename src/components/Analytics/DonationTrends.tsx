import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DonationTrendsProps {
  data: {
    donations: number[];
    dates: string[];
  };
}

export function DonationTrends({ data }: DonationTrendsProps) {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Donations',
        data: data.donations,
        borderColor: '#16a34a',
        backgroundColor: '#bbf7d0',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Donation Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Donation Activity
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}