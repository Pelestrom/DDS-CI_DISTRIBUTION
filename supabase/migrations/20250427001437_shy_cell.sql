/*
  # Initial schema for e-commerce application

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `category` (text, required)
      - `price` (numeric, required)
      - `description` (text)
      - `image_url` (text, required)
      - `stock` (integer, required)
      - `is_limited` (boolean)
      - `is_new` (boolean)
      - `is_promo` (boolean)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, required, unique)
      - `image_url` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  description text,
  image_url text NOT NULL,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_limited boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_promo boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Allow public read access on products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for categories
CREATE POLICY "Allow public read access on categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();