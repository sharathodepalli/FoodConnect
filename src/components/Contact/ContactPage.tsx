import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Package,
  Users,
  Heart,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Send,
  Clock
} from 'lucide-react';

// Mock FAQ data
const faqs = [
  {
    category: 'Donations',
    questions: [
      {
        q: 'How do I list food donations?',
        a: 'Simply sign up as a donor, click "List Food" in your dashboard, and fill out the details about your donation. Our platform will help connect you with recipients in your area.'
      },
      {
        q: 'What types of food can I donate?',
        a: 'We accept various types of food including fresh produce, baked goods, prepared meals, and packaged foods that are still safe for consumption. All donations must meet our food safety guidelines.'
      }
    ]
  },
  {
    category: 'Finding Food',
    questions: [
      {
        q: 'How can I find available food near me?',
        a: 'Use our "Explore" page to browse available food listings in your area. You can filter by distance, food type, and pickup time to find what works best for you.'
      },
      {
        q: 'Is FoodConnect available in my area?',
        a: 'We currently operate in major cities across the country. Enter your zip code on our homepage to check availability in your area.'
      }
    ]
  },
  {
    category: 'Volunteering',
    questions: [
      {
        q: 'Can I volunteer part-time?',
        a: 'Yes! We offer flexible volunteering opportunities that can fit any schedule. You can choose specific days or hours that work best for you.'
      },
      {
        q: 'What volunteer roles are available?',
        a: 'We have various roles including food delivery drivers, sorting helpers, event coordinators, and community ambassadors.'
      }
    ]
  }
];

// Mock location data
const locations = [
  {
    city: 'San Francisco',
    address: '123 Market Street, San Francisco, CA 94105',
    phone: '(415) 555-0123',
    email: 'sf@foodconnect.org',
    hours: 'Mon-Fri: 9AM-6PM'
  },
  {
    city: 'Oakland',
    address: '456 Broadway, Oakland, CA 94607',
    phone: '(510) 555-0123',
    email: 'oakland@foodconnect.org',
    hours: 'Mon-Fri: 9AM-6PM'
  },
  {
    city: 'Berkeley',
    address: '789 University Ave, Berkeley, CA 94710',
    phone: '(510) 555-0124',
    email: 'berkeley@foodconnect.org',
    hours: 'Mon-Fri: 9AM-6PM'
  }
];

export function ContactPage() {
  const [activeCategory, setActiveCategory] = useState('Donations');
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [contactPurpose, setContactPurpose] = useState('donor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'donor',
    businessName: '',
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      purpose: 'donor',
      businessName: '',
      location: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            We're Just a Message Away!
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Have a question, want to help, or need support? Let's connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Send Us a Message
              <ChevronDown className="inline-block ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-green-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find Our Locations
              <ChevronDown className="inline-block ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How Can We Help You?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Donors */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Have questions about donating?</h3>
              <p className="text-gray-600 mb-6">
                Learn how to list your surplus food and make a difference in your community.
              </p>
              <button
                onClick={() => {
                  setContactPurpose('donor');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Our Donor Team
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* For Recipients */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Need help finding food?</h3>
              <p className="text-gray-600 mb-6">
                Get assistance with finding available food donations in your area.
              </p>
              <button
                onClick={() => {
                  setContactPurpose('recipient');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Recipient Support
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* For Volunteers */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ready to make a difference?</h3>
              <p className="text-gray-600 mb-6">
                Discover volunteer opportunities and join our community of helpers.
              </p>
              <button
                onClick={() => {
                  setContactPurpose('volunteer');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Connect with Volunteer Support
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Contact
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="donor">Donor Inquiry</option>
                  <option value="recipient">Recipient Assistance</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="other">General Question</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {formData.purpose === 'donor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>
              )}

              {(formData.purpose === 'recipient' || formData.purpose === 'volunteer') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="City or Zip Code"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Locations Section */}
      <div id="locations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Visit Us or Our Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div
                key={location.city}
                className="bg-white rounded-xl shadow-sm p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4">{location.city}</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-green-600" />
                    {location.address}
                  </p>
                  <p className="flex items-start">
                    <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-green-600" />
                    {location.phone}
                  </p>
                  <p className="flex items-start">
                    <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-green-600" />
                    {location.email}
                  </p>
                  <p className="flex items-start">
                    <Clock className="w-5 h-5 mr-2 flex-shrink-0 text-green-600" />
                    {location.hours}
                  </p>
                </div>
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, '_blank')}
                  className="mt-6 inline-flex items-center px-4 py-2 text-green-600 hover:text-green-700"
                >
                  Get Directions
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Quick Answers to Your Questions
          </h2>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                {faqs.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`flex-1 px-6 py-4 text-sm font-medium ${
                      activeCategory === category.category
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {faqs.find(cat => cat.category === activeCategory)?.questions.map((faq, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Let's Stay in Touch!
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Get updates on how we're making a difference—straight to your inbox
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}