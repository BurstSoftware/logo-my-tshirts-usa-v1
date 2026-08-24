import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-ink-950">
            <ShoppingCart className="h-5 w-5 text-brand-600" />
            Your Cart
            {totalItems > 0 && (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-sm font-semibold text-brand-700">
                {totalItems}
              </span>
            )}
          </h3>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-500 hover:bg-ink-50"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-50">
              <ShoppingCart className="h-8 w-8 text-ink-300" />
            </div>
            <p className="text-ink-500">Your cart is empty.</p>
            <button onClick={closeCart} className="btn-secondary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <img
                      src={item.product.image_url || ''}
                      alt={item.product.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-ink-100"
                    />
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-semibold text-ink-950">{item.product.name}</p>
                      <p className="text-xs text-ink-500">
                        {item.color} · {item.size}
                      </p>
                      <p className="mt-1 text-sm font-bold text-brand-700">
                        ${Number(item.product.price).toFixed(2)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-lg ring-1 ring-ink-200">
                          <button
                            onClick={() => updateQuantity(i, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-500 hover:bg-ink-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(i, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-500 hover:bg-ink-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(i)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink-100 px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="text-lg font-bold text-ink-950">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-400">Shipping and decoration costs calculated at checkout.</p>
              <Link to="/checkout" className="btn-primary mt-4 w-full" onClick={closeCart}>
                Request Quote
              </Link>
              <button onClick={closeCart} className="btn-ghost mt-2 w-full">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
