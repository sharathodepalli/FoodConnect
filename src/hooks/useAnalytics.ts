import { useCallback } from 'react';
import { useApp } from '../context/AppContext';

export function useAnalytics() {
  const { state, dispatch } = useApp();

  const updateAnalytics = useCallback((data: Partial<typeof state.analytics>) => {
    dispatch({ type: 'UPDATE_ANALYTICS', payload: data });
  }, [dispatch]);

  return {
    analytics: state.analytics,
    updateAnalytics,
  };
}