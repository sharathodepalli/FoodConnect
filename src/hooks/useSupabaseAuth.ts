import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
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
  const { login, logout } = useAuth();
  const { addNotification } = useNotifications();

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error('No user returned from sign in');
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profile) {
        throw new Error('User profile not found');
      }

      // Update auth state
      login({
        id: data.user.id,
        name: profile.full_name,
        role: profile.role,
        avatar: profile.avatar_url,
        notifications: 0
      });

      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully signed in.'
      });

      return { success: true };

    } catch (error) {
      console.error('Sign in error:', error);
      
      const message = error instanceof Error 
        ? error.message 
        : 'Invalid email or password';
      
      addNotification({
        type: 'error',
        title: 'Sign in failed',
        message
      });

      return { success: false, error: message };
    }
  }, [login, addNotification]);

  const signUp = useCallback(async ({ email, password, fullName, role, businessName }: SignUpData) => {
    try {
      // Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            business_name: businessName
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user returned from sign up');

      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: fullName,
          role,
          business_name: businessName
        }])
        .select()
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Failed to create user profile');

      // Update auth state
      login({
        id: authData.user.id,
        name: profile.full_name,
        role: profile.role,
        avatar: profile.avatar_url,
        notifications: 0
      });

      addNotification({
        type: 'success',
        title: 'Welcome to FoodConnect!',
        message: 'Your account has been created successfully.'
      });

      return { success: true };

    } catch (error) {
      console.error('Sign up error:', error);
      
      let message = 'Failed to create account';
      
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          message = 'An account with this email already exists';
        } else {
          message = error.message;
        }
      }

      addNotification({
        type: 'error',
        title: 'Sign up failed',
        message
      });

      return { success: false, error: message };
    }
  }, [login, addNotification]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      logout();
      
      addNotification({
        type: 'success',
        title: 'Signed out',
        message: 'You have been successfully signed out.'
      });

    } catch (error) {
      console.error('Sign out error:', error);
      
      const message = error instanceof Error 
        ? error.message 
        : 'Failed to sign out';
      
      addNotification({
        type: 'error',
        title: 'Sign out failed',
        message
      });
    }
  }, [logout, addNotification]);

  return {
    signIn,
    signUp,
    signOut
  };
}