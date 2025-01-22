import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { useNotifications } from './useNotifications';
import type { UserRole } from '../types/user';

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
}

export function useSupabaseAuth() {
  const { dispatch } = useApp();
  const { addNotification } = useNotifications();

  const signIn = async (email: string, password: string) => {
    console.log('Attempting to sign in with email:', email); // Log email
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error.message);
        return { success: false, error: error.message };
      }

      // Successfully signed in
      console.log('Signed in user:', data.user);

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        return { success: false, error: profileError.message };
      }

      // Dispatch user data
      dispatch({
        type: "SET_USER",
        payload: {
          id: data.user.id,
          name: profile.full_name,
          role: profile.role,
          avatar: profile.avatar_url,
          notifications: 0,
        },
      });

      return { success: true, user: data.user, profile };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const signUp = useCallback(async ({ email, password, fullName, role, businessName }: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            business_name: businessName,
          },
        },
      });

      if (error) throw error;

      // Check if user data is available
      if (data.user) {
        // Dispatch user data or handle post-signup logic
        dispatch({
          type: "SET_USER",
          payload: {
            id: data.user.id,
            name: fullName,
            role,
            avatar: null, // Set default avatar or handle accordingly
            notifications: 0,
          },
        });

        addNotification({
          type: 'success',
          title: 'Sign up successful',
          message: 'Welcome to FoodConnect!',
        });

        return { success: true };
      } else {
        throw new Error('User data is not available after sign up');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      const message = error instanceof Error ? error.message : 'Failed to sign up';
      
      addNotification({
        type: 'error',
        title: 'Sign up failed',
        message,
      });

      return { success: false, error: message };
    }
  }, [dispatch, addNotification]);

  const signOut = useCallback(async () => {
    // Sign out logic...
  }, [dispatch, addNotification]);

  return {
    signIn,
    signUp,
    signOut
  };
}
