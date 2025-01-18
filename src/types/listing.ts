export interface FoodListing {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  quantity: string;
  distance: string;
  expiresIn: string;
  category: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  donorInstructions?: string;
  donor: {
    id: string;
    name: string;
    rating: number;
    totalDonations: number;
  };
  allergens?: string[];
  storageType?: string;
  condition?: string;
  contactInfo?: {
    name: string;
    phone: string;
  };
  notes?: string;
}

export type FoodCategory = 'all' | 'bakery' | 'fruits' | 'vegetables' | 'meals' | 'dairy' | 'beverages';
export type DistanceFilter = '1' | '5' | '10' | '20';
export type ExpirationFilter = '2' | '4' | '8' | '24';