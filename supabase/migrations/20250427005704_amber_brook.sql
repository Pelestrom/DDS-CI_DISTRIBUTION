/*
  # Update products table to link with categories

  1. Changes
    - Add foreign key constraint from products.category to categories.name
    - Update existing data to ensure consistency
*/

-- First, ensure all product categories match existing category names
UPDATE products
SET category = c.name
FROM categories c
WHERE LOWER(products.category) = LOWER(c.name);

-- Add foreign key constraint
ALTER TABLE products
DROP CONSTRAINT IF EXISTS products_category_fkey;

ALTER TABLE products
ADD CONSTRAINT products_category_fkey
FOREIGN KEY (category)
REFERENCES categories(name)
ON UPDATE CASCADE;