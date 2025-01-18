import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Clock,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  ChevronDown,
  Star,
  Search,
  Filter,
  ArrowRight,
  Award,
  Truck,
  Package
} from 'lucide-react';

// Mock volunteer opportunities data
const opportunities = [
  {
    id: 1,
    title: "Food Delivery Driver",
    description: "Help deliver surplus food from donors to local food banks and shelters.",
    location: "San Francisco, CA",
    distance: "2.5 miles away",
    timeCommit: "2-3 hours",
    schedule: "Flexible",
    spotsLeft: 3,
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Delivery", "Driving Required", "Flexible Schedule"]
  },
  {
    id: 2,
    title: "Food Bank Sorter",
    description: "Sort and organize donated food items at our local food bank partner.",
    location: "Oakland, CA",
    distance: "1.8 miles away",
    timeCommit: "4 hours",
    schedule: "Weekends",
    spotsLeft: 5,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Food Sorting", "Indoor", "Weekend"]
  },
  {
    id: 3,
    title: "Community Event Coordinator",
    description: "Help organize and run food donation events in your local community.",
    location: "Berkeley, CA",
    distance: "3.2 miles away",
    timeCommit: "5 hours",
    schedule: "Monthly",
    spotsLeft: 2,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Event Planning", "Leadership", "Monthly"]
  }
];

// Mock volunteer impact data
const volunteerImpact = [
  { label: 'Active Volunteers', value: 500, suffix: '+' },
  { label: 'Hours Contributed', value: 25000, suffix: '+' },
  { label: 'Meals Delivered', value: 100000, suffix: '+' }
];

// Mock testimonials
const testimonials = [
  {
    name: "David Kim",
    role: "Food Delivery Volunteer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "Volunteering with FoodConnect has been incredibly rewarding. I've met amazing people and helped make a real difference in my community."
  },
  {
    name: "Lisa Chen",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "The platform makes it so easy to find and sign up for volunteer opportunities. I love being able to track my impact over time."
  }
];

export function VolunteerPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Make a Difference,<br />One Meal at a Time
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Join our volunteer community to help connect surplus food with those in need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay-2">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Up to Volunteer
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Opportunities
              <ChevronDown className="inline-block ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {volunteerImpact.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {metric.value.toLocaleString()}{metric.suffix}
                </div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Volunteer Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Volunteer with FoodConnect?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Impact Lives</h3>
              <p className="text-gray-600">
                Help reduce food waste and ensure surplus food reaches those who need it most.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexible Schedule</h3>
              <p className="text-gray-600">
                Choose opportunities that fit your availability and preferences.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Join a Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals passionate about making a difference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <div id="opportunities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Available Opportunities
          </h2>

          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="delivery">Delivery</option>
              <option value="sorting">Food Sorting</option>
              <option value="event">Event Planning</option>
            </select>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {opportunity.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {opportunity.spotsLeft} spots left
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{opportunity.timeCommit}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/volunteer/opportunities/${opportunity.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Volunteer Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-green-100"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-green-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Star className="w-5 h-5 text-yellow-400 inline" />
                  <Star className="w-5 h-5 text-yellow-400 inline" />
                  <Star className="w-5 h-5 text-yellow-400 inline" />
                  <Star className="w-5 h-5 text-yellow-400 inline" />
                  <Star className="w-5 h-5 text-yellow-400 inline" />
                </div>
                <p className="text-gray-600 text-lg italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join our community of volunteers and help us create a world with zero food waste
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Sign Up Now
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/volunteer/dashboard"
              className="group px-8 py-4 bg-green-700 text-white rounded-full text-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              View Dashboard
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}