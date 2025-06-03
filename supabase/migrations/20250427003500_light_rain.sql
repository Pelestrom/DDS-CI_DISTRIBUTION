/*
  # Insert initial data for e-commerce application

  1. Categories
    - Insert initial categories with images
  
  2. Products
    - Insert sample products with all necessary details
*/

-- Insert categories
INSERT INTO categories (name, image_url) VALUES
  ('Vins', 'https://readdy.ai/api/search-image?query=Elegant%20wine%20bottles%20collection%20with%20red%20and%20white%20wines%20arranged%20beautifully%20against%20soft%20neutral%20background%20with%20warm%20lighting%20professional%20product%20photography%20luxury%20feel&width=300&height=200&seq=5&orientation=landscape'),
  ('Liqueurs', 'https://readdy.ai/api/search-image?query=Premium%20spirits%20and%20liquor%20bottles%20collection%20with%20various%20shapes%20and%20amber%20colors%20against%20soft%20neutral%20background%20with%20dramatic%20lighting%20professional%20product%20photography%20luxury%20feel&width=300&height=200&seq=6&orientation=landscape'),
  ('Boissons', 'https://readdy.ai/api/search-image?query=Variety%20of%20soft%20drinks%20and%20beverages%20in%20bottles%20and%20cans%20arranged%20against%20soft%20neutral%20background%20with%20refreshing%20appearance%20professional%20product%20photography&width=300&height=200&seq=7&orientation=landscape'),
  ('Eaux Minérales', 'https://readdy.ai/api/search-image?query=Collection%20of%20mineral%20water%20bottles%20in%20different%20shapes%20and%20sizes%20arranged%20on%20neutral%20background%20with%20clear%20refreshing%20appearance%20professional%20product%20photography&width=300&height=200&seq=8&orientation=landscape'),
  ('Bières', 'https://readdy.ai/api/search-image?query=Collection%20of%20beer%20bottles%20and%20cans%20of%20various%20brands%20arranged%20on%20neutral%20background%20with%20amber%20color%20liquid%20professional%20product%20photography&width=300&height=200&seq=9&orientation=landscape'),
  ('Sucreries', 'https://readdy.ai/api/search-image?query=Luxury%20confectionery%20assortment%20with%20chocolates%20candies%20and%20sweets%20elegantly%20arranged%20against%20soft%20neutral%20background%20professional%20food%20photography&width=300&height=200&seq=10&orientation=landscape');

-- Insert products
INSERT INTO products (name, category, price, description, image_url, stock, is_limited, is_new, is_promo) VALUES
  (
    'Château Margaux 2018',
    'Vins',
    95,
    'Un vin rouge d''exception de la région de Bordeaux. Le Château Margaux 2018 offre un bouquet complexe de fruits noirs, d''épices et de notes boisées. En bouche, il révèle une structure tannique élégante et une longueur remarquable.',
    'https://readdy.ai/api/search-image?query=Elegant%20bottle%20of%20red%20wine%20Chateau%20Margaux%20with%20deep%20burgundy%20color%20liquid%20inside%20clear%20glass%20bottle%20with%20black%20and%20gold%20label%20against%20soft%20neutral%20background%20professional%20product%20photography&width=400&height=500&seq=1&orientation=portrait',
    15,
    true,
    true,
    false
  ),
  (
    'Hennessy XO',
    'Liqueurs',
    150,
    'Un cognac d''exception vieilli pendant plus de dix ans. Le Hennessy XO séduit par ses arômes riches de fruits confits, d''épices et de chocolat. Sa texture onctueuse et sa finale persistante en font un spiritueux de référence.',
    'https://readdy.ai/api/search-image?query=Premium%20cognac%20Hennessy%20XO%20bottle%20with%20amber%20liquid%20and%20distinctive%20bottle%20shape%20against%20neutral%20elegant%20background%20professional%20product%20photography%20high%20resolution&width=400&height=500&seq=2&orientation=portrait',
    8,
    true,
    false,
    true
  ),
  (
    'Dom Pérignon Vintage',
    'Vins',
    175,
    'Un champagne d''exception qui incarne l''excellence et le raffinement. Notes délicates d''agrumes et de fleurs blanches, avec une effervescence fine et persistante.',
    'https://readdy.ai/api/search-image?query=Luxury%20champagne%20Dom%20Perignon%20bottle%20with%20elegant%20shape%20and%20distinctive%20label%20against%20soft%20neutral%20background%20with%20subtle%20lighting%20professional%20product%20photography&width=400&height=500&seq=3&orientation=portrait',
    20,
    false,
    true,
    false
  ),
  (
    'Assortiment Chocolats Fins',
    'Sucreries',
    35,
    'Une sélection exquise de chocolats fins artisanaux. Un assortiment varié de pralinés, ganaches et truffes pour les amateurs de chocolat raffiné.',
    'https://readdy.ai/api/search-image?query=Luxury%20chocolate%20assortment%20box%20with%20various%20pralines%20and%20truffles%20elegantly%20arranged%20against%20soft%20neutral%20background%20professional%20food%20photography&width=400&height=500&seq=4&orientation=portrait',
    30,
    false,
    false,
    true
  );