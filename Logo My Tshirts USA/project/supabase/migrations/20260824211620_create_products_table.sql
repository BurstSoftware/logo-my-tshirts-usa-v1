/*
# Create products table for Logo My Shirts USA

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null) — product name
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `category` (text, not null) — one of: t-shirts, polos-knits, sweatshirts-fleece, caps, activewear, outerwear, woven-shirts, bags, workwear, accessories, personal-protection, ladies, youth
  - `brand` (text) — brand name
  - `price` (numeric, not null) — unit price
  - `description` (text) — product description
  - `image_url` (text) — product image URL
  - `colors` (text[]) — available colors
  - `sizes` (text[]) — available sizes
  - `decoration_methods` (text[]) — e.g. ['Screen Print', 'Embroidery']
  - `rating` (numeric) — product rating 0-5
  - `featured` (boolean, default false) — show on homepage
  - `created_at` (timestamp)

2. Security
- Enable RLS on `products`.
- Allow anon + authenticated read access (public catalog, no sign-in needed).
- No write policies needed — products are managed server-side.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  brand text,
  price numeric(10,2) NOT NULL,
  description text,
  image_url text,
  colors text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  decoration_methods text[] DEFAULT '{}',
  rating numeric(2,1) DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
