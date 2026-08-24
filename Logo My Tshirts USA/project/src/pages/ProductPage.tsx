import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Check, Minus, Plus, ArrowLeft, Truck, Shield, Clock } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { getCategory } from '@/lib/categories';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProduct(data);
          setColor(data.colors[0] || '');
          setSize(data.sizes[0] || '');
          const cat = getCategory(data.category);
          if (cat) {
            supabase
              .from('products')
              .select('*')
              .eq('category', data.category)
              .neq('id', data.id)
              .limit(4)
              .then(({ data: rel }) => setRelated(rel || []));
          }
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container-page py-32">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-ink-100" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-ink-100" />
            <div className="h-4 w-full animate-pulse rounded bg-ink-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-ink-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="btn-primary mt-6">Back to Home</Link>
      </div>
    );
  }

  const category = getCategory(product.category);

  return (
    <div>
      <section className="pt-24 sm:pt-28">
        <div className="container-page">
          <nav className="flex items-center gap-1.5 text-xs text-ink-400">
            <Link to="/" className="hover:text-brand-700">Home</Link>
            <ChevronRight className="h-3 w-3" />
            {category && (
              <>
                <Link to={`/category/${category.slug}`} className="hover:text-brand-700">{category.shortName}</Link>
                <ChevronRight className="h-3 w-3" />
              </>
            )}
            <span className="line-clamp-1 text-ink-700">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative">
              <div className="card overflow-hidden rounded-2xl">
                <img src={product.image_url || ''} alt={product.name} className="aspect-square w-full object-cover" />
              </div>
              {product.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-ink-950">
                  Best Seller
                </span>
              )}
            </div>

            {/* Details */}
            <div>
              <p className="text-sm font-medium text-brand-600">{product.brand}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-accent-400 text-accent-400' : 'text-ink-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-ink-500">{Number(product.rating).toFixed(1)} rating</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-ink-950">${Number(product.price).toFixed(2)}</p>
              <p className="mt-1 text-sm text-ink-400">per piece · decoration extra</p>

              <p className="mt-5 text-sm leading-relaxed text-ink-600">{product.description}</p>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink-900">Color: <span className="font-normal text-ink-500">{color}</span></p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all ${
                          color === c
                            ? 'border-brand-600 bg-brand-50 text-brand-700'
                            : 'border-ink-200 text-ink-600 hover:border-brand-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-ink-900">Size: <span className="font-normal text-ink-500">{size}</span></p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`min-w-10 rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all ${
                          size === s
                            ? 'border-brand-600 bg-brand-50 text-brand-700'
                            : 'border-ink-200 text-ink-600 hover:border-brand-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Decoration methods */}
              {product.decoration_methods.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-ink-900">Available decoration:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.decoration_methods.map((d) => (
                      <span key={d} className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-ink-100">
                        <Check className="h-3 w-3 text-brand-600" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl ring-1 ring-ink-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-ink-500 hover:bg-ink-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center text-ink-500 hover:bg-ink-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => addItem(product, quantity, color, size)}
                  className="btn-primary flex-1"
                >
                  Add to Cart
                </button>
              </div>
              <Link to="/designer" className="btn-secondary mt-3 w-full">
                Design with Your Logo
              </Link>

              {/* Trust badges */}
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-ink-100 pt-5">
                {[
                  { icon: Truck, label: 'Free shipping over $500' },
                  { icon: Clock, label: 'Rush service available' },
                  { icon: Shield, label: 'Quality guaranteed' },
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <t.icon className="mx-auto h-5 w-5 text-brand-600" />
                    <p className="mt-1 text-xs text-ink-500">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">You may also like</h2>
              {category && (
                <Link to={`/category/${category.slug}`} className="btn-ghost text-sm">
                  <ArrowLeft className="h-4 w-4" />
                  Back to {category.shortName}
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
