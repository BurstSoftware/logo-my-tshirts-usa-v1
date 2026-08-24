import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { getCategory, categories } from '@/lib/categories';
import { supabase, type Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategory(slug || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*')
      .eq('category', category.slug)
      .order('featured', { ascending: false })
      .order('rating', { ascending: false })
      .then(({ data }) => {
        let sorted = data || [];
        if (sortBy === 'price-low') sorted = [...sorted].sort((a, b) => Number(a.price) - Number(b.price));
        if (sortBy === 'price-high') sorted = [...sorted].sort((a, b) => Number(b.price) - Number(a.price));
        if (sortBy === 'rating') sorted = [...sorted].sort((a, b) => Number(b.rating) - Number(a.rating));
        setProducts(sorted);
        setLoading(false);
      });
  }, [category, sortBy]);

  if (!category) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/" className="btn-primary mt-6">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="container-page">
          <nav className="flex items-center gap-1.5 text-xs text-ink-400">
            <Link to="/" className="hover:text-brand-700">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-700">{category.name}</span>
          </nav>
          <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
              <p className="mt-3 max-w-lg text-ink-500">{category.description}</p>
            </div>
            <div className="relative h-40 overflow-hidden rounded-2xl lg:h-48">
              <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-ink-500">
              {loading ? 'Loading…' : `${products.length} product${products.length !== 1 ? 's' : ''}`}
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-ink-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-ink-100" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-ink-500">No products found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="pb-20">
        <div className="container-page">
          <h2 className="mb-6 text-xl font-bold">Shop other categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="group flex shrink-0 items-center gap-3 rounded-2xl bg-ink-50 p-3 ring-1 ring-ink-100 hover:bg-brand-50 hover:ring-brand-200"
              >
                <img src={c.image} alt={c.name} className="h-12 w-12 rounded-xl object-cover" />
                <span className="text-sm font-semibold text-ink-800 group-hover:text-brand-700">{c.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
