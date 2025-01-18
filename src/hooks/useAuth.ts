import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import type { User } from '../types/user';

export function useAuth() {
  const { state, dispatch } = useApp();

  const login = useCallback((user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: 'SET_USER', payload: null });
  }, [dispatch]);

  return {
    user: state.user,
    isAuthenticated: !!state.user,
    login,
    logout
  };
}