import React, { useState, useEffect } from 'react';
import { Mail, Lock, AlertCircle, Loader, User, Building } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import type { UserRole } from '../../types/user';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick: () => void;
}

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', regex: /.{8,}/ },
  { label: 'At least one letter', regex: /[A-Za-z]/ },
  { label: 'At least one number', regex: /\d/ },
  { label: 'At least one special character', regex: /[@$!%*#?&]/ }
];

export function SignUpModal({ isOpen, onClose, onSignInClick }: SignUpModalProps) {
  const { signUp } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'recipient' as UserRole,
    businessName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        role: 'recipient',
        businessName: '',
      });
      setErrors({});
      setPasswordFocus(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password || !PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (formData.role === 'donor' && !formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required for donors';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    
    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
        businessName: formData.businessName
      });

      if (result.success) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    return PASSWORD_REQUIREMENTS.filter(req => 
      req.regex.test(formData.password)
    ).length;
  };

  const strengthPercentage = (getPasswordStrength() / PASSWORD_REQUIREMENTS.length) * 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Your Account">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I want to...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'recipient' })}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.role === 'recipient'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >
              <User className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-medium">Find Food</div>
              <p className="text-sm text-gray-500 mt-1">
                I'm looking for food donations
              </p>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'donor' })}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.role === 'donor'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >
              <Building className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-medium">Donate Food</div>
              <p className="text-sm text-gray-500 mt-1">
                I want to donate surplus food
              </p>
            </button>
          </div>
        </div>

        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Business Name Input (for donors) */}
        {formData.role === 'donor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.businessName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your business name"
              />
            </div>
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.businessName}
              </p>
            )}
          </div>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password}
            </p>
          )}
          {(passwordFocus || formData.password) && (
            <div className="mt-2 space-y-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthPercentage === 100
                      ? 'bg-green-500'
                      : strengthPercentage >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${strengthPercentage}%` }}
                />
              </div>
              <ul className="text-sm space-y-1">
                {PASSWORD_REQUIREMENTS.map((req, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      req.regex.test(formData.password)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="mr-2">
                      {req.regex.test(formData.password) ? '✓' : '○'}
                    </span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Sign In Link */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSignInClick();
              }}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </button>
          </span>
        </div>
      </form>
    </Modal>
  );
}