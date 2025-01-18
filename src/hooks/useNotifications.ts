import { useCallback } from 'react';
import { useApp } from '../context/AppContext';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

export function useNotifications() {
  const { state, dispatch } = useApp();

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time'>) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification,
        id: Date.now(),
        time: new Date().toISOString()
      }
    });
  }, [dispatch]);

  const removeNotification = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, [dispatch]);

  const clearAllNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  }, [dispatch]);

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
}