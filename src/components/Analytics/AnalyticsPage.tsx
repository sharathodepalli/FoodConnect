import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Package,
  Leaf,
  Award,
  ChevronDown,
  MapPin,
  Calendar,
  Filter,
  Download,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImpactMetrics } from './ImpactMetrics';
import { DonationTrends } from './DonationTrends';
import { CategoryBreakdown } from './CategoryBreakdown';
import { ImpactMap } from './ImpactMap';
import { EnvironmentalImpact } from './EnvironmentalImpact';
import { Recommendations } from './Recommendations';
import { Leaderboard } from './Leaderboard';

// Mock data for analytics
const mockAnalytics = {
  totalDonations: 1250,
  mealsServed: 3750,
  co2Saved: 2500,
  activeListings: 45,
  recentActivity: {
    donations: [65, 75, 85, 95, 105, 115, 125],
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  categoryBreakdown: {
    bakery: 35,
    fruits: 25,
    vegetables: 20,
    meals: 20
  },
  impactMetrics: {
    recipientsHelped: 1500,
    volunteersEngaged: 250,
    communitiesServed: 12
  },
  environmentalStats: {
    waterSaved: 25000,
    energySaved: 15000,
    wasteDiverted: 5000
  }
};

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Your Impact, Visualized
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl animate-fade-in-delay">
            See how your contributions are reducing waste, feeding communities, and making a difference
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-delay-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-6 h-6" />
                <span className="text-sm opacity-90">Total Donations</span>
              </div>
              <div className="text-3xl font-bold">
                {mockAnalytics.totalDonations.toLocaleString()}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6" />
                <span className="text-sm opacity-90">Meals Served</span>
              </div>
              <div className="text-3xl font-bold">
                {mockAnalytics.mealsServed.toLocaleString()}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Leaf className="w-6 h-6" />
                <span className="text-sm opacity-90">CO₂ Saved (kg)</span>
              </div>
              <div className="text-3xl font-bold">
                {mockAnalytics.co2Saved.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DonationTrends data={mockAnalytics.recentActivity} />
          <CategoryBreakdown data={mockAnalytics.categoryBreakdown} />
        </div>

        {/* Impact Map */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Impact Reach
          </h2>
          <ImpactMap />
        </div>

        {/* Environmental Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EnvironmentalImpact data={mockAnalytics.environmentalStats} />
          <Recommendations />
        </div>

        {/* Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Recipients Helped
            </h3>
            <div className="text-3xl font-bold text-green-600">
              {mockAnalytics.impactMetrics.recipientsHelped.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              People received food assistance
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Volunteers Engaged
            </h3>
            <div className="text-3xl font-bold text-blue-600">
              {mockAnalytics.impactMetrics.volunteersEngaged.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Active volunteers this month
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Communities Served
            </h3>
            <div className="text-3xl font-bold text-orange-600">
              {mockAnalytics.impactMetrics.communitiesServed.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Local communities impacted
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Community Leaders
          </h2>
          <Leaderboard />
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Make a Bigger Impact?
          </h2>
          <p className="text-lg mb-6 text-white/90">
            Set up recurring donations and help us create lasting change in our community.
          </p>
          <Link
            to="/donor/setup-recurring"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Set Up Recurring Donations
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}