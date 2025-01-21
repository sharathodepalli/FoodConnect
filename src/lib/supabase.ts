// import { createClient } from '@supabase/supabase-js';
// import type { Database } from '../types/supabase';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   }
// });

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase'; // Ensure this matches your schema

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true, // Automatically refresh expired tokens
    persistSession: true,   // Save the session in local storage
    detectSessionInUrl: true, // Automatically handle OAuth redirects
  },
});

// Utility function: Get the current session
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
    return null;
  }

  console.log('Current session:', data.session);
  return data.session;
};

// Utility function: Listen to auth state changes
export const setupAuthStateListener = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth Event:', event);
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session?.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out.');
    }
  });
};

// Initialize the listener
setupAuthStateListener();
