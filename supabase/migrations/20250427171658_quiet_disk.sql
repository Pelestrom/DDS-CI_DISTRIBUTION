/*
  # Update products table for promotional prices and FCFA currency

  1. Changes
    - Add original_price column for promotional pricing
    - Update price column to handle FCFA values
    - Add trigger to calculate discount percentage
*/

-- Add original_price column
ALTER TABLE products
ADD COLUMN original_price numeric CHECK (original_price >= 0);

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

-- Add discount_percentage column
ALTER TABLE products
ADD COLUMN discount_percentage numeric;

-- Create trigger for discount calculation
CREATE TRIGGER update_discount_percentage
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION calculate_discount_percentage();