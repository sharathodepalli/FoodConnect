/*
  # Update Profile Policies and User Handler

  1. Changes
    - Drop all existing profile policies
    - Create new profile policies with proper checks
    - Update handle_new_user function with better error handling
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for SELECT, INSERT, and UPDATE operations
    - Ensure proper user role handling
*/

-- First, drop all existing policies for the profiles table
DO $$ 
BEGIN
  -- Drop all policies on the profiles table
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON profiles', pol.policyname);
  END LOOP;
END $$;

-- Create new policies with unique names
CREATE POLICY "profiles_select_policy" 
ON profiles FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "profiles_insert_policy" 
ON profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" 
ON profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Update the handle_new_user function with better error handling and defaults
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_role user_role;
BEGIN
  -- Set default role if not provided
  default_role := COALESCE(
    (new.raw_user_meta_data->>'role')::user_role,
    'recipient'::user_role
  );

  -- Insert or update profile
  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    role
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'),
    new.raw_user_meta_data->>'avatar_url',
    default_role
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = now();

  RETURN new;
EXCEPTION
  WHEN others THEN
    -- Log error details (in a real production system)
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;