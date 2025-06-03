import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string; // UUID from database
  name: string;
  category: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  description?: string;
  image_url: string;
  stock: number;
  is_limited: boolean;
  is_new: boolean;
  is_promo: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  image_url?: string;
  created_at: string;
};

export async function fetchProducts(options: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  filters?: {
    isNew?: boolean;
    isPromo?: boolean;
    isLimited?: boolean;
  };
}) {
  let query = supabase
    .from('products')
    .select('*');

  if (options.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

  if (options.category) {
    query = query.eq('category', options.category);
  }

  if (options.minPrice !== undefined) {
    query = query.gte('price', options.minPrice);
  }
  if (options.maxPrice !== undefined) {
    query = query.lte('price', options.maxPrice);
  }

  if (options.filters?.isNew) {
    query = query.eq('is_new', true);
  }
  if (options.filters?.isPromo) {
    query = query.eq('is_promo', true);
  }
  if (options.filters?.isLimited) {
    query = query.eq('is_limited', true);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Product[];
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    throw error;
  }

  return data as Category[];
}

export async function fetchProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
}

// Format price to FCFA
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}