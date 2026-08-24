import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="container-page py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Quote request sent!</h1>
          <p className="mt-3 text-ink-500">
            Thanks, {form.name || 'there'}! Our team will review your request and get back to you within 24 hours with a detailed quote.
          </p>
          <Link to="/" className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-50">
            <ShoppingBag className="h-8 w-8 text-ink-300" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-ink-500">Browse our catalog and add products to request a quote.</p>
          <Link to="/category/t-shirts" className="btn-primary mt-8">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28">
      <div className="container-page">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Request a Quote</h1>
        <p className="mt-1 text-sm text-ink-500">
          Review your items and submit your details. We'll send you a detailed quote within 24 hours.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card p-6">
            <h2 className="text-lg font-semibold">Your Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-ink-700">Full Name *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700">Phone *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-ink-700">Notes / Decoration Details</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Tell us about your logo, decoration method, colors, deadline, etc."
                className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button type="submit" className="btn-primary mt-6 w-full">
              Submit Quote Request
            </button>
          </form>

          {/* Summary */}
          <div className="card h-fit p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <img
                    src={item.product.image_url || ''}
                    alt={item.product.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-ink-100"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-ink-950">{item.product.name}</p>
                    <p className="text-xs text-ink-500">{item.color} · {item.size}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {item.quantity} × ${Number(item.product.price).toFixed(2)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-ink-950">
                    ${(item.quantity * Number(item.product.price)).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Decoration</span>
                <span>Calculated in quote</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Shipping</span>
                <span>Calculated in quote</span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 text-base font-bold text-ink-950">
                <span>Estimated Total</span>
                <span>${totalPrice.toFixed(2)}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
