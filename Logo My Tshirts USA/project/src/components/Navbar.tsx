import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShoppingCart, Shirt, Phone } from 'lucide-react';
import { categories } from '@/lib/categories';
import { useCart } from '@/lib/cart';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft' : 'bg-white'
      }`}
    >
      {/* Top bar */}
      <div className="hidden bg-ink-950 text-ink-200 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            1-800-555-0199
          </span>
          <span>Free quotes · No minimums on select items · Rush service available</span>
          <span>Mon–Fri 8am–6pm EST</span>
        </div>
      </div>

      <nav className="container-page flex h-16 items-center justify-between sm:h-18">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <Shirt className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-950">
            Logo My Shirts<span className="text-brand-600"> USA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="btn-ghost flex items-center">
              Shop All
              <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full w-[640px] pt-1">
                <div className="card grid grid-cols-3 gap-1 p-3">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/category/${c.slug}`}
                      className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-brand-50"
                    >
                      <img src={c.image} alt={c.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{c.shortName}</p>
                        <p className="text-xs text-ink-400 line-clamp-1">{c.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/designer" className="btn-ghost">
            Logo Designer
          </Link>
          <a href="#why-us" className="btn-ghost">Why Us</a>
          <a href="#contact" className="btn-ghost">Contact</a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-800 ring-1 ring-ink-200 hover:bg-brand-50 hover:text-brand-700"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
          <Link to="/designer" className="btn-primary hidden sm:inline-flex">
            Design Now
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-800 ring-1 ring-ink-200 hover:bg-ink-50 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto pb-6">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-400">Categories</p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-brand-50"
                >
                  <img src={c.image} alt={c.name} className="h-9 w-9 rounded-lg object-cover" />
                  <span className="text-sm font-medium text-ink-800">{c.shortName}</span>
                </Link>
              ))}
            </div>
            <div className="my-3 h-px bg-ink-100" />
            <Link to="/designer" className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50">
              Logo Designer
            </Link>
            <a href="#why-us" className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50">
              Why Us
            </a>
            <a href="#contact" className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50">
              Contact
            </a>
            <a href="tel:18005550199" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white">
              <Phone className="h-4 w-4" />
              1-800-555-0199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
