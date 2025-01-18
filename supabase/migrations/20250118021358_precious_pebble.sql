/*
  # Initial Schema for FoodConnect Application

  1. New Tables
    - users: Core user data and authentication
    - profiles: Extended user profile information
    - food_listings: Food donation listings
    - food_bases: FoodConnect base locations
    - tasks: Pickup/delivery tasks
    - notifications: User notifications
    - analytics: Aggregated metrics
    - categories: Food categories
    - base_applications: Applications to become a base

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for specific roles

  3. Relationships
    - Users -> Profiles (1:1)
    - Users -> Food Listings (1:many)
    - Users -> Tasks (1:many)
    - Food Listings -> Tasks (1:many)
    - Food Bases -> Food Listings (1:many)
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('donor', 'recipient', 'volunteer', 'base_manager', 'admin');
CREATE TYPE listing_status AS ENUM ('active', 'claimed', 'completed', 'expired');
CREATE TYPE task_status AS ENUM ('pending', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE notification_type AS ENUM ('success', 'error', 'warning', 'info');
CREATE TYPE base_application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'recipient',
  full_name text,
  avatar_url text,
  phone text,
  address text,
  business_name text,
  business_type text,
  storage_capacity text,
  operating_hours text,
  total_donations integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT phone_length CHECK (char_length(phone) >= 10)
);

-- Create food_bases table
CREATE TABLE food_bases (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  latitude numeric(10,8),
  longitude numeric(11,8),
  manager_id uuid REFERENCES auth.users ON DELETE SET NULL,
  phone text,
  email text,
  operating_hours text,
  storage_capacity text,
  is_24_7 boolean DEFAULT false,
  is_active boolean DEFAULT true,
  total_meals_handled integer DEFAULT 0,
  total_donors_served integer DEFAULT 0,
  total_volunteers integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_latitude CHECK (latitude >= -90 AND latitude <= 90),
  CONSTRAINT valid_longitude CHECK (longitude >= -180 AND longitude <= 180)
);

-- Create food_listings table
CREATE TABLE food_listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id uuid REFERENCES auth.users ON DELETE CASCADE,
  base_id uuid REFERENCES food_bases ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES categories,
  quantity text NOT NULL,
  pickup_address text NOT NULL,
  pickup_latitude numeric(10,8),
  pickup_longitude numeric(11,8),
  expires_at timestamptz NOT NULL,
  images text[] DEFAULT array[]::text[],
  status listing_status DEFAULT 'active',
  storage_type text,
  condition text,
  allergens text[] DEFAULT array[]::text[],
  contact_name text,
  contact_phone text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_pickup_latitude CHECK (pickup_latitude >= -90 AND pickup_latitude <= 90),
  CONSTRAINT valid_pickup_longitude CHECK (pickup_longitude >= -180 AND pickup_longitude <= 180)
);

-- Create tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES food_listings ON DELETE CASCADE,
  volunteer_id uuid REFERENCES auth.users ON DELETE SET NULL,
  status task_status DEFAULT 'pending',
  pickup_time timestamptz,
  completed_at timestamptz,
  rating numeric(3,2),
  feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  type notification_type DEFAULT 'info',
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create base_applications table
CREATE TABLE base_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id uuid REFERENCES auth.users ON DELETE CASCADE,
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  operating_hours text NOT NULL,
  storage_capacity text NOT NULL,
  accepted_categories text[] DEFAULT array[]::text[],
  reason text,
  status base_application_status DEFAULT 'pending',
  reviewed_by uuid REFERENCES auth.users ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analytics table for aggregated metrics
CREATE TABLE analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date date NOT NULL UNIQUE,
  total_donations integer DEFAULT 0,
  total_meals_served integer DEFAULT 0,
  total_co2_saved numeric(10,2) DEFAULT 0,
  active_donors integer DEFAULT 0,
  active_volunteers integer DEFAULT 0,
  active_bases integer DEFAULT 0,
  category_breakdown jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Food Bases policies
CREATE POLICY "Anyone can view active bases"
  ON food_bases FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Base managers can update their bases"
  ON food_bases FOR UPDATE
  TO authenticated
  USING (manager_id = auth.uid());

-- Food Listings policies
CREATE POLICY "Anyone can view active listings"
  ON food_listings FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Donors can create listings"
  ON food_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Donors can update their listings"
  ON food_listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = donor_id);

-- Tasks policies
CREATE POLICY "Users can view their tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT donor_id FROM food_listings WHERE id = listing_id
      UNION
      SELECT volunteer_id
    )
  );

CREATE POLICY "Volunteers can update assigned tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (volunteer_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Base Applications policies
CREATE POLICY "Users can create applications"
  ON base_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can view their applications"
  ON base_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = applicant_id);

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_food_listings_donor_id ON food_listings(donor_id);
CREATE INDEX idx_food_listings_base_id ON food_listings(base_id);
CREATE INDEX idx_food_listings_status ON food_listings(status);
CREATE INDEX idx_food_listings_expires_at ON food_listings(expires_at);
CREATE INDEX idx_tasks_volunteer_id ON tasks(volunteer_id);
CREATE INDEX idx_tasks_listing_id ON tasks(listing_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_base_applications_status ON base_applications(status);
CREATE INDEX idx_analytics_date ON analytics(date);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('bakery', 'Bread, pastries, and baked goods'),
  ('fruits', 'Fresh fruits and produce'),
  ('vegetables', 'Fresh vegetables and produce'),
  ('meals', 'Prepared meals and dishes'),
  ('dairy', 'Milk, cheese, and dairy products'),
  ('beverages', 'Drinks and beverages');

-- Create function to update profile timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_food_bases_updated_at
  BEFORE UPDATE ON food_bases
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_food_listings_updated_at
  BEFORE UPDATE ON food_listings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_base_applications_updated_at
  BEFORE UPDATE ON base_applications
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();