import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Store,
  Users,
  User,
  MapPin,
  Camera,
  Clock,
  Package,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

type UserCategory = 'restaurant' | 'mart' | 'organization' | 'individual';

interface CategoryOption {
  id: UserCategory;
  title: string;
  description: string;
  icon: React.ElementType;
}

const categories: CategoryOption[] = [
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'Share surplus food from your restaurant',
    icon: Building
  },
  {
    id: 'mart',
    title: 'Mart/Store',
    description: 'Donate excess inventory from your store',
    icon: Store
  },
  {
    id: 'organization',
    title: 'Organization',
    description: 'NGOs, food banks, and community organizations',
    icon: Users
  },
  {
    id: 'individual',
    title: 'Individual',
    description: 'Donate or volunteer as an individual',
    icon: User
  }
];

export function SignUpForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>(null);
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    avatar: '',

    // Business Info
    businessName: '',
    registrationNumber: '',
    operatingHours: '',
    specialization: [] as string[],

    // Organization Info
    orgType: '',
    missionStatement: '',

    // Individual Info
    preferences: [] as string[],
    skills: [] as string[],

    // Additional Info
    bio: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !selectedCategory) {
      newErrors.category = 'Please select a category';
    }

    if (currentStep === 2) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.name) newErrors.name = 'Name is required';
    }

    if (currentStep === 3) {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        // In a real app, make API call to create user
        console.log('Form submitted:', formData);
        navigate('/dashboard');
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">
            Join our community and start making a difference
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                1
              </div>
              <span className="ml-2 text-sm">Category</span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                2
              </div>
              <span className="ml-2 text-sm">Basic Info</span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                3
              </div>
              <span className="ml-2 text-sm">Details</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Select Your Category</h2>
              
              {errors.category && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.category}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Basic Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Category-Specific Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Category-Specific Fields */}
              {selectedCategory === 'restaurant' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Operating Hours
                    </label>
                    <input
                      type="text"
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Mon-Fri: 9AM-10PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Food Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Bakery', 'Main Course', 'Appetizers', 'Desserts', 'Beverages'].map((category) => (
                        <label
                          key={category}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            formData.specialization.includes(category)
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          } border`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.specialization.includes(category)}
                            onChange={(e) => {
                              const newSpecialization = e.target.checked
                                ? [...formData.specialization, category]
                                : formData.specialization.filter(c => c !== category);
                              setFormData({ ...formData, specialization: newSpecialization });
                            }}
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'mart' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Type
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select store type</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="supermarket">Supermarket</option>
                      <option value="convenience">Convenience Store</option>
                      <option value="specialty">Specialty Food Store</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedCategory === 'organization' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Type
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select organization type</option>
                      <option value="ngo">NGO</option>
                      <option value="foodbank">Food Bank</option>
                      <option value="shelter">Shelter</option>
                      <option value="community">Community Organization</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mission Statement
                    </label>
                    <textarea
                      value={formData.missionStatement}
                      onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {selectedCategory === 'individual' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferences
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Donating', 'Volunteering', 'Both'].map((pref) => (
                        <label
                          key={pref}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            formData.preferences.includes(pref)
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          } border`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.preferences.includes(pref)}
                            onChange={(e) => {
                              const newPreferences = e.target.checked
                                ? [...formData.preferences, pref]
                                : formData.preferences.filter(p => p !== pref);
                              setFormData({ ...formData, preferences: newPreferences });
                            }}
                          />
                          {pref}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills & Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Driving', 'Food Handling', 'Event Planning', 'Administration'].map((skill) => (
                        <label
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            formData.skills.includes(skill)
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          } border`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.skills.includes(skill)}
                            onChange={(e) => {
                              const newSkills = e.target.checked
                                ? [...formData.skills, skill]
                                : formData.skills.filter(s => s !== skill);
                              setFormData({ ...formData, skills: newSkills });
                            }}
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              Back
            </button>
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                Create Account
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}