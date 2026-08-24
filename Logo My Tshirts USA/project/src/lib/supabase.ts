import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  price: number;
  description: string | null;
  image_url: string | null;
  colors: string[];
  sizes: string[];
  decoration_methods: string[];
  rating: number;
  featured: boolean;
  created_at: string;
};
