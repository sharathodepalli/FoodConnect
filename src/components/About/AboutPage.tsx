import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  ArrowRight,
  ChevronRight,
  Heart,
  Users,
  Globe,
  Award,
  Star,
  MapPin,
  Clock,
  ChevronDown
} from 'lucide-react';

// Mock impact data
const impactMetrics = [
  { label: 'Meals Shared', value: 150000, suffix: '+' },
  { label: 'CO₂ Emissions Saved', value: 75000, suffix: 'kg' },
  { label: 'Communities Served', value: 50, suffix: '+' }
];

// Mock timeline data
const timeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'FoodConnect started with a simple observation: local bakeries had surplus bread at closing, while nearby shelters needed food.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    year: '2021',
    title: 'Growing Impact',
    description: 'Expanded to restaurants and grocery stores, developed our volunteer network, and launched the mobile app.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    year: '2022',
    title: 'Community First',
    description: 'Reached 100,000 meals shared milestone and expanded to 50+ communities across the country.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    year: '2023',
    title: 'Looking Forward',
    description: 'Launching new initiatives to reduce food waste and strengthen community connections.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

// Mock team data
const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'Every meal shared strengthens our community bonds.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'Technology can help us solve food waste at scale.'
  },
  {
    name: 'Lisa Kim',
    role: 'Community Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: 'Our volunteers are the heart of FoodConnect.'
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

export function AboutPage() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            A Table for Everyone
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            At FoodConnect, we're creating a world where no meal is wasted, and everyone has a place at the table
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay-2">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join the Movement
              <ArrowRight className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Our Story
              <ChevronDown className="inline-block ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric) => (
              <ImpactMetric key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div id="our-story" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Where It All Began
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-green-200" />

            {/* Timeline Events */}
            {timeline.map((event, index) => (
              <div
                key={event.year}
                className={`relative mb-16 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'
                } md:w-1/2`}
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-green-600 text-white rounded-full text-lg font-semibold">
                        {event.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-green-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 rounded-xl p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community First</h3>
              <p className="text-gray-600">
                Building stronger communities through food sharing and volunteer engagement.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Reducing food waste and environmental impact through efficient distribution.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inclusivity</h3>
              <p className="text-gray-600">
                Creating a platform where everyone can contribute to and benefit from food sharing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-green-100"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-600 mb-4">{member.role}</p>
                <p className="text-gray-600 italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Seat Is Waiting
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Whether you want to share food, lend a hand, or find a meal, FoodConnect is here to bring us all together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Sign Up Today
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/volunteer"
              className="group px-8 py-4 bg-green-700 text-white rounded-full text-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Explore Opportunities
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}