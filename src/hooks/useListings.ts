import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import type { FoodListing } from '../types/listing';
import { supabase } from '../lib/supabase';

export function useListings() {
  const { state, dispatch } = useApp();

  const addListing = useCallback(async (listing: FoodListing) => {

  const foodItem = {
    title: listing.title,
    category_id: listing.category,
    description: listing.description,
    quantity: listing.quantity,
    pickup_address: listing.pickupLocation.address,
    pickup_latitude: listing.pickupLocation.latitude,
    pickup_longitude: listing.pickupLocation.longitude,
    expires_at: listing.expires_at,
    images: listing.images,
    allergens: listing.allergens,
    storage_type: listing.storageType,
    condition: listing.condition,
    contact_name: listing.contactInfo?.name,
    contact_phone: listing.contactInfo?.phone,
    notes: listing.notes,
  };
  
  console.log("before pushing list", listing);

  console.log("before pushing list food item: ", foodItem);

  const { data, error } =await supabase
  .from('food_listings')
  .insert([
    foodItem
  ])
  .select();

  console.log("after pushing list data: ", data);

  if (error) throw error;
        
    dispatch({ type: 'ADD_LISTING', payload: listing });
  }, [dispatch]);

  const deleteListing = useCallback((id: number) => {
    dispatch({ type: 'DELETE_LISTING', payload: id });
  }, [dispatch]);

  const markAsClaimed = useCallback((id: number) => {
    dispatch({ type: 'MARK_AS_CLAIMED', payload: id });
  }, [dispatch]);

  return {
    activeListings: state.listings.active,
    pastListings: state.listings.past,
    addListing,
    deleteListing,
    markAsClaimed,
  };
}