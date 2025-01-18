import React from 'react';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import type { FoodListing } from '../../types/listing';

interface ListingsTableProps {
  listings: FoodListing[];
  onDelete?: (id: number) => void;
  onMarkAsClaimed?: (id: number) => void;
  type: 'active' | 'past';
}

export function ListingsTable({ listings, onDelete, onMarkAsClaimed, type }: ListingsTableProps) {
  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600">
          {type === 'active' 
            ? 'No active listings. Add a new listing to get started!'
            : 'No past listings yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {type === 'active' && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={listing.image}
                        alt={listing.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                      <div className="text-sm text-gray-500">{listing.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    type === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.expiresIn}
                  </span>
                </td>
                {type === 'active' && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onMarkAsClaimed?.(listing.id)}
                      className="text-green-600 hover:text-green-900 mx-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete?.(listing.id)}
                      className="text-red-600 hover:text-red-900 mx-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {listings.map((listing) => (
          <div key={listing.id} className="p-4">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-lg object-cover"
                src={listing.image}
                alt={listing.title}
              />
              <div className="ml-4 flex-1">
                <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                <div className="text-sm text-gray-500">{listing.quantity}</div>
                <div className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    type === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.expiresIn}
                  </span>
                </div>
              </div>
              {type === 'active' && (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onMarkAsClaimed?.(listing.id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete?.(listing.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}