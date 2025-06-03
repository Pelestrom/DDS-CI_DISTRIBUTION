/*
  # Update products table for promotional prices and FCFA currency

  1. Changes
    - Update price column to handle FCFA values
    - Add trigger to calculate discount percentage
*/

-- Update existing prices to FCFA (multiply by 655.957)
UPDATE products
SET price = ROUND(price * 655.957),
    original_price = CASE 
      WHEN is_promo THEN ROUND(price * 655.957)
      ELSE NULL 
    END;

-- Create function to calculate discount percentage
CREATE OR REPLACE FUNCTION calculate_discount_percentage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_promo AND NEW.original_price IS NOT NULL AND NEW.price IS NOT NULL THEN
    NEW.discount_percentage = ROUND((1 - (NEW.price::numeric / NEW.original_price::numeric)) * 100);
  ELSE
    NEW.discount_percentage = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add discount_percentage column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE products ADD COLUMN discount_percentage numeric;
  END IF;
END $$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_discount_percentage ON products;

-- Create trigger for discount calculation
CREATE TRIGGER update_discount_percentage
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION calculate_discount_percentage();