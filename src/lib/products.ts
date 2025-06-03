import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  description?: string;
  images: string[];
  stock: number;
  is_limited: boolean;
  is_new: boolean;
  is_promo: boolean;
  is_featured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  image_url: string;
};

// Categories statiques
export const categories: Category[] = [
  {
    id: uuidv4(),
    name: 'Vins',
    image_url: 'https://readdy.ai/api/search-image?query=Elegant%20wine%20bottles%20collection%20with%20red%20and%20white%20wines%20arranged%20beautifully%20against%20soft%20neutral%20background%20with%20warm%20lighting%20professional%20product%20photography%20luxury%20feel&width=300&height=200&seq=5&orientation=landscape'
  },
  {
    id: uuidv4(),
    name: 'Liqueurs',
    image_url: 'https://readdy.ai/api/search-image?query=Premium%20spirits%20and%20liquor%20bottles%20collection%20with%20various%20shapes%20and%20amber%20colors%20against%20soft%20neutral%20background%20with%20dramatic%20lighting%20professional%20product%20photography%20luxury%20feel&width=300&height=200&seq=6&orientation=landscape'
  },
  {
    id: uuidv4(),
    name: 'Boissons',
    image_url: 'https://readdy.ai/api/search-image?query=Variety%20of%20soft%20drinks%20and%20beverages%20in%20bottles%20and%20cans%20arranged%20against%20soft%20neutral%20background%20with%20refreshing%20appearance%20professional%20product%20photography&width=300&height=200&seq=7&orientation=landscape'
  },
  {
    id: uuidv4(),
    name: 'Bières',
    image_url: 'https://readdy.ai/api/search-image?query=Collection%20of%20beer%20bottles%20and%20cans%20of%20various%20brands%20arranged%20on%20neutral%20background%20with%20amber%20color%20liquid%20professional%20product%20photography&width=300&height=200&seq=9&orientation=landscape'
  },
  {
    id: uuidv4(),
    name: 'Sucreries',
    image_url: 'https://readdy.ai/api/search-image?query=Luxury%20confectionery%20assortment%20with%20chocolates%20candies%20and%20sweets%20elegantly%20arranged%20against%20soft%20neutral%20background%20professional%20food%20photography&width=300&height=200&seq=10&orientation=landscape'
  }
];

// Produits statiques
export const products: Product[] = [
  {
    id: uuidv4(),
    name: 'Coca-Cola Pack 12x33cl',
    category: 'Boissons',
    price: 5000,
    original_price: 6000,
    discount_percentage: 17,
    description: 'Pack de 12 canettes de Coca-Cola, format 33cl. Idéal pour vos fêtes et événements.',
    images: [
      'https://readdy.ai/api/search-image?query=Pack%20of%2012%20Coca%20Cola%20cans%20arranged%20professionally%20against%20white%20background%20product%20photography&width=400&height=400&seq=1'
    ],
    stock: 50,
    is_limited: false,
    is_new: false,
    is_promo: true,
    is_featured: false
  }
];

// Format price to FCFA
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Fonctions de gestion des produits
export function addProduct(product: Omit<Product, 'id'>): Product {
  const newProduct = {
    ...product,
    id: uuidv4()
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates
  };
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  products.splice(index, 1);
  return true;
}

export function getProductById(id: string): Product | null {
  return products.find(p => p.id === id) || null;
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description?.toLowerCase().includes(searchTerm)
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.is_featured);
}