import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Search,
  Truck,
  ArrowRight,
  Leaf,
  Heart,
  Clock,
  Star,
  ChevronRight,
  ChevronDown,
  Users,
  Utensils
} from 'lucide-react';

// Mock impact metrics data
const impactMetrics = [
  { label: 'Meals Shared', value: 150000, suffix: '+' },
  { label: 'Active Donors', value: 500, suffix: '+' },
  { label: 'CO₂ Saved', value: 20000, suffix: 'kg' }
];

// Mock testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Restaurant Owner",
    type: "Donor",
    image: "",
    quote: "FoodConnect has made it incredibly easy for our restaurant to donate surplus food. It's rewarding to know we're helping our community while reducing waste."
  },
  {
    name: "Michael Chen",
    role: "Community Volunteer",
    type: "Volunteer",
    image: "",
    quote: "Being a FoodConnect volunteer has opened my eyes to how we can make a real difference in our community. The platform makes coordination effortless."
  },
  {
    name: "Emily Rodriguez",
    role: "Food Bank Coordinator",
    type: "Recipient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    quote: "Thanks to FoodConnect, we've been able to help more families than ever before. The real-time notifications and easy pickup process make everything smooth."
  }
];

const features = [
  {
    icon: Leaf,
    title: "Environmental Impact",
    description: "Help reduce food waste and lower environmental impact by connecting surplus food with those in need."
  },
  {
    icon: Heart,
    title: "Community Support",
    description: "Build stronger communities by facilitating food donations and volunteer opportunities."
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant notifications about food availability and track donations in real-time."
  }
];

// Counter animation hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return [count, setIsVisible] as const;
}

function ImpactMetric({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const [count, setIsVisible] = useCounter(value);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`metric-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [label, setIsVisible]);

  return (
    <div id={`metric-${label}`} className="text-center">
      <div className="text-4xl font-bold text-green-600 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export function HowItWorks() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
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
            Changing Lives Through Food
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Discover how FoodConnect bridges the gap between surplus and need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay-2">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/explore"
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Listings
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/80" />
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric) => (
              <ImpactMetric key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Connecting Communities Made Simple
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Donors */}
            <div className="group bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Turn Surplus into Impact</h3>
              <ol className="text-gray-600 mb-6 text-left space-y-4">
                <li className="flex items-start">
                  <span className="font-bold text-green-600 mr-2">1.</span>
                  List your food in seconds
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-600 mr-2">2.</span>
                  Add details like location and quantity
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-600 mr-2">3.</span>
                  Watch your donation make a difference
                </li>
              </ol>
              <Link
                to="/donor/dashboard"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                List Food Now
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Recipients */}
            <div className="group bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Food Near You</h3>
              <ol className="text-gray-600 mb-6 text-left space-y-4">
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 mr-2">1.</span>
                  Browse available food near you
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 mr-2">2.</span>
                  Reserve with one click
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 mr-2">3.</span>
                  Pick up when ready
                </li>
              </ol>
              <Link
                to="/explore"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Find Food Near Me
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Volunteers */}
            <div className="group bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Make a Difference</h3>
              <ol className="text-gray-600 mb-6 text-left space-y-4">
                <li className="flex items-start">
                  <span className="font-bold text-orange-600 mr-2">1.</span>
                  Sign up as a volunteer
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-orange-600 mr-2">2.</span>
                  Help with food deliveries
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-orange-600 mr-2">3.</span>
                  Track your community impact
                </li>
              </ol>
              <Link
                to="/volunteer/opportunities"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Volunteer With Us
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Hear from Our Community
          </h2>

          <div className="relative">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-2xl">
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
                    <p className="text-gray-600 text-lg italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of people reducing food waste and feeding communities
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
              to="/explore"
              className="group px-8 py-4 bg-green-700 text-white rounded-full text-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Explore Listings
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}