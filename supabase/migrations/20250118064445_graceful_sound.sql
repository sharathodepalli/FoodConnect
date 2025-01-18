/*
  # Fix Authentication and Profile Creation

  1. Changes
    - Add error handling to handle_new_user function
    - Add ON CONFLICT handling for profile creation
    - Add function to ensure profile exists
    - Add trigger for profile updates
  
  2. Security
    - Maintain existing RLS policies
    - Add additional checks for profile operations
*/

-- Create a function to ensure a profile exists for a user
CREATE OR REPLACE FUNCTION ensure_profile_exists(user_id uuid)
RETURNS void AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Check if profile exists
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = user_id
  ) INTO profile_exists;

  -- If profile doesn't exist, create it with default values
  IF NOT profile_exists THEN
    INSERT INTO profiles (
      id,
      full_name,
      role,
      created_at,
      updated_at
    ) VALUES (
      user_id,
      'User',
      'recipient',
      now(),
      now()
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Attempt to create profile with retry logic
  FOR i IN 1..3 LOOP
    BEGIN
      INSERT INTO public.profiles (
        id,
        full_name,
        avatar_url,
        role,
        created_at,
        updated_at
      )
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(
          (NEW.raw_user_meta_data->>'role')::user_role,
          'recipient'::user_role
        ),
        now(),
        now()
      )
      ON CONFLICT (id) DO UPDATE
      SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        role = EXCLUDED.role,
        updated_at = now();
        
      -- If successful, exit the loop
      EXIT;
    EXCEPTION
      WHEN others THEN
        -- On last attempt, raise the error
        IF i = 3 THEN
          RAISE WARNING 'Failed to create profile for user % after 3 attempts: %', NEW.id, SQLERRM;
        END IF;
        -- Wait a moment before retrying
        PERFORM pg_sleep(0.1);
    END;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to ensure timestamps are updated
CREATE OR REPLACE FUNCTION update_profile_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS update_profiles_timestamp ON profiles;
CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_timestamp();

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS trigger AS $$
BEGIN
  -- Ensure required fields are not null
  NEW.full_name := COALESCE(NEW.full_name, OLD.full_name, 'User');
  NEW.role := COALESCE(NEW.role, OLD.role, 'recipient'::user_role);
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS handle_profile_updates ON profiles;
CREATE TRIGGER handle_profile_updates
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();