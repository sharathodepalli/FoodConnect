import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Package, AlertCircle, Camera, Trash2, ChevronDown, AlertTriangle } from 'lucide-react';
import { useListings } from '../../hooks/useListings';
import type { FoodListing } from '../../types/listing';

interface ListFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  quantity: string;
  unit: string;
  category: string;
  address: string;
  expiresIn: string;
  expiryDate: string;
  expiryTime: string;
  allergens: string[];
  storageType: string;
  condition: string;
  contactName: string;
  contactPhone: string;
  images: string[];
  notes: string;
}

const allergenOptions = [
  'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts',
  'Peanuts', 'Wheat', 'Soy', 'Gluten'
];

const storageOptions = [
  { value: 'room', label: 'No refrigeration needed' },
  { value: 'refrigerated', label: 'Requires refrigeration' },
  { value: 'frozen', label: 'Requires freezing' }
];

const conditionOptions = [
  { value: 'fresh', label: 'Fresh' },
  { value: 'nearExpiry', label: 'Near expiry' },
  { value: 'packaged', label: 'Packaged/sealed' }
];

export function ListFoodModal({ isOpen, onClose }: ListFoodModalProps) {
  const { addListing } = useListings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    quantity: '',
    unit: 'items',
    category: 'bakery',
    address: '',
    expiresIn: 'custom',
    expiryDate: '',
    expiryTime: '',
    allergens: [],
    storageType: 'room',
    condition: 'fresh',
    contactName: '',
    contactPhone: '',
    images: [],
    notes: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, we would use a geocoding service to get the address
            console.log('Location obtained:', position.coords);
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.quantity || !formData.address) {
        throw new Error('Please fill in all required fields');
      }

      // Validate quantity is a number
      if (isNaN(Number(formData.quantity))) {
        throw new Error('Quantity must be a valid number');
      }

      // Validate phone number format
      if (formData.contactPhone && !/^\+?[\d\s-]{10,}$/.test(formData.contactPhone)) {
        throw new Error('Please enter a valid phone number');
      }

      // Create new listing
      const newListing: FoodListing = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        image: formData.images[0] || "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        images: formData.images,
        quantity: `${formData.quantity} ${formData.unit}`,
        distance: "0.0 miles away",
        expiresIn: formData.expiresIn === 'custom' 
          ? `Expires on ${formData.expiryDate} at ${formData.expiryTime}`
          : `${formData.expiresIn} hours`,
        category: formData.category,
        pickupLocation: {
          address: formData.address,
          latitude: 37.7749,
          longitude: -122.4194,
        },
        donor: {
          id: "d123",
          name: "City Bakery",
          rating: 4.8,
          totalDonations: 156
        },
        allergens: formData.allergens,
        storageType: formData.storageType,
        condition: formData.condition,
        contactInfo: formData.contactName || formData.contactPhone ? {
          name: formData.contactName,
          phone: formData.contactPhone,
        } : undefined,
        notes: formData.notes,
      };
      console.log("before add listing call: ",newListing);
      addListing(newListing);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, we would upload these to a server
      // For now, we'll just create object URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">List Food Donation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                1
              </div>
              <span className="ml-2 text-sm">Basic Info</span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                2
              </div>
              <span className="ml-2 text-sm">Details</span>
            </div>
            <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                3
              </div>
              <span className="ml-2 text-sm">Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Fresh Bread Assortment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description* <span className="text-gray-400">({200 - formData.description.length} characters left)</span>
                </label>
                <textarea
                  required
                  maxLength={200}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Describe the food items..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity*
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="items">Items</option>
                    <option value="kg">Kilograms</option>
                    <option value="lbs">Pounds</option>
                    <option value="servings">Servings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="bakery">Bakery</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="meals">Prepared Meals</option>
                  <option value="dairy">Dairy</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Address*
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter pickup address"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          // In a real app, we would use reverse geocoding here
                          console.log(position.coords);
                        },
                        (error) => console.error(error)
                      );
                    }
                  }}
                  className="mt-2 text-sm text-green-600 hover:text-green-700"
                >
                  Use my current location
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration
                </label>
                <div className="space-y-3">
                  <select
                    value={formData.expiresIn}
                    onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="8">8 hours</option>
                    <option value="24">24 hours</option>
                    <option value="custom">Custom date/time</option>
                  </select>

                  {formData.expiresIn === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <input
                        type="time"
                        value={formData.expiryTime}
                        onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergens
                </label>
                <div className="flex flex-wrap gap-2">
                  {allergenOptions.map((allergen) => (
                    <label
                      key={allergen}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                        formData.allergens.includes(allergen)
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } border`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.allergens.includes(allergen)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              allergens: [...formData.allergens, allergen]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              allergens: formData.allergens.filter(a => a !== allergen)
                            });
                          }
                        }}
                      />
                      {allergen}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Requirements
                </label>
                <select
                  value={formData.storageType}
                  onChange={(e) => setFormData({ ...formData, storageType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {storageOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {conditionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Information (Optional)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Contact name"
                  />
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Photos
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image}
                          alt={`Food item ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 4 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          multiple={formData.images.length === 0}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Add up to 4 photos of your food items
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Any special instructions or additional information..."
                />
              </div>

              {/* Preview Section */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium">Preview Listing</span>
                  <ChevronDown className={`w-5 h-5 transform transition-transform ${showPreview ? 'rotate-180' : ''}`} />
                </button>
                
                {showPreview && (
                  <div className="mt-4 space-y-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-200">
                      {formData.images[0] ? (
                        <img
                          src={formData.images[0]}
                          alt={formData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No image provided
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{formData.title}</h3>
                      <p className="text-gray-600 mt-2">{formData.description}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Quantity</span>
                          <p>{formData.quantity} {formData.unit}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Category</span>
                          <p className="capitalize">{formData.category}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Expires</span>
                          <p>
                            {formData.expiresIn === 'custom'
                              ? `${formData.expiryDate} at ${formData.expiryTime}`
                              : `In ${formData.expiresIn} hours`}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Storage</span>
                          <p className="capitalize">{formData.storageType}</p>
                        </div>
                      </div>

                      {formData.allergens.length > 0 && (
                        <div className="mt-4">
                          <span className="text-sm text-gray-500">Contains allergens:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.allergens.map(allergen => (
                              <span
                                key={allergen}
                                className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                              >
                                {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                step === 1 ? 'invisible' : ''
              }`}
              disabled={step === 1 || isSubmitting}
            >
              Back
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Package className="animate-spin w-5 h-5 mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'List Food'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}