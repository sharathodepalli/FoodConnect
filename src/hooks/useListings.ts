import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import type { FoodListing } from '../types/listing';

export function useListings() {
  const { state, dispatch } = useApp();

  const addListing = useCallback((listing: FoodListing) => {
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