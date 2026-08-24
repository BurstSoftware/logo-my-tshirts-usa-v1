import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import type { Product } from '@/lib/supabase';
import { useCart } from '@/lib/cart';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-ink-50">
        <img
          src={product.image_url || ''}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-400 px-2.5 py-1 text-xs font-bold text-ink-950">
            Best Seller
          </span>
        )}
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-ink-400">{product.brand}</span>
          <span className="flex items-center gap-0.5 text-xs text-ink-500">
            <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
            {Number(product.rating).toFixed(1)}
          </span>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-ink-950 hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-ink-500">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-ink-950">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product, 1, product.colors[0] || 'Default', product.sizes[0] || 'One Size')}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white transition-all hover:bg-brand-700 active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
