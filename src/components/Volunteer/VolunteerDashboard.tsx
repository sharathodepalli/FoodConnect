import React, { useState } from 'react';
import {
  Clock,
  Package,
  Users,
  Leaf,
  Award,
  Bell,
  ChevronRight,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for volunteer metrics
const volunteerMetrics = {
  hoursVolunteered: 45,
  deliveriesCompleted: 23,
  communitiesServed: 8,
  co2Saved: 156,
  nextMilestone: 50
};

// Mock data for open opportunities
const openOpportunities = [
  {
    id: 1,
    title: "Deliver Meals to Downtown SF",
    date: "2024-03-15",
    time: "2:00 PM - 4:00 PM",
    location: "San Francisco, CA",
    requiredSkills: ["Driving", "Food Handling"],
    spots: 3
  },
  {
    id: 2,
    title: "Food Bank Sorting Assistant",
    date: "2024-03-16",
    time: "9:00 AM - 12:00 PM",
    location: "Oakland, CA",
    requiredSkills: ["Organization", "Physical Labor"],
    spots: 5
  }
];

// Mock data for completed tasks
const completedTasks = [
  {
    id: 1,
    title: "Meal Delivery - Mission District",
    date: "2024-03-10",
    hours: 2,
    feedback: "Great work! Very punctual and professional."
  },
  {
    id: 2,
    title: "Food Sorting at Community Center",
    date: "2024-03-08",
    hours: 3,
    feedback: "Excellent attention to detail."
  }
];

export function VolunteerDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Sarah!</h1>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for making a difference in your community
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-500"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/volunteer/opportunities"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View Open Opportunities
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <button
              className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Log Volunteer Hours
              <Clock className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-green-600" />
              <div className="text-sm text-gray-500">Hours Goal: {volunteerMetrics.nextMilestone}</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {volunteerMetrics.hoursVolunteered}
            </div>
            <div className="text-sm text-gray-600">Hours Volunteered</div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${(volunteerMetrics.hoursVolunteered / volunteerMetrics.nextMilestone) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {volunteerMetrics.deliveriesCompleted}
            </div>
            <div className="text-sm text-gray-600">Deliveries Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {volunteerMetrics.communitiesServed}
            </div>
            <div className="text-sm text-gray-600">Communities Served</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {volunteerMetrics.co2Saved}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Open Opportunities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Opportunities Near You</h2>
                <Link
                  to="/volunteer/opportunities"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {openOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {opportunity.date} at {opportunity.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {opportunity.location}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {opportunity.requiredSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        Sign Up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Volunteer Journey</h2>
              
              <div className="space-y-6">
                {completedTasks.map((task) => (
                  <div key={task.id} className="border-l-2 border-green-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          {task.date} • {task.hours} hours
                        </div>
                        {task.feedback && (
                          <div className="mt-2 flex items-start space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <p className="text-sm text-gray-600">{task.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Training and Growth */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Expand Your Skills</h2>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Food Safety Basics</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn essential food handling and safety practices.
                  </p>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Start Learning
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Delivery Best Practices</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Tips for efficient and safe food delivery.
                  </p>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Start Learning
                  </button>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">First 10 Hours</h3>
                    <p className="text-sm text-gray-600">Completed your first 10 hours of volunteering</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Delivery Pro</h3>
                    <p className="text-sm text-gray-600">Completed 20 successful deliveries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}