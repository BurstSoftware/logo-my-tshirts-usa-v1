import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock, Award, Check, Palette, Scissors, Sparkles } from 'lucide-react';
import { categories } from '@/lib/categories';
import { supabase, type Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

const heroImage = 'https://images.pexels.com/photos/27893067/pexels-photo-27893067.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const benefits = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $500' },
  { icon: Clock, title: 'Rush Service', desc: '48-hour turnaround available' },
  { icon: Shield, title: 'Quality Guarantee', desc: 'Not happy? We make it right.' },
  { icon: Award, title: 'No Minimums', desc: 'On select items' },
];

const steps = [
  { icon: Palette, title: 'Choose Your Product', desc: 'Browse 13 categories of premium apparel and accessories.' },
  { icon: Scissors, title: 'Add Your Logo', desc: 'Use our online designer or upload your own artwork.' },
  { icon: Truck, title: 'We Decorate & Ship', desc: 'Screen print, embroidery, or heat transfer — done fast.' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8)
      .then(({ data }) => {
        setFeatured(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                Custom Logo Apparel Since 2005
              </span>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Your logo on{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">premium apparel</span>
              </h1>
              <p className="mt-5 max-w-lg text-balance text-base text-ink-500 sm:text-lg">
                Screen printing, embroidery, and promotional products — all with your logo. Top brands, fast turnaround, no minimums on select items.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/designer" className="btn-primary">
                  Design Your Shirt
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/category/t-shirts" className="btn-secondary">
                  Browse Products
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-ink-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <span>Rated 4.9/5 by 2,400+ customers</span>
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-brand-200/50 to-accent-200/40 blur-2xl" />
              <div className="card overflow-hidden rounded-3xl">
                <img src={heroImage} alt="Screen printing workshop" className="h-72 w-full object-cover sm:h-96" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {benefits.map((b) => (
                    <div key={b.title} className="text-center">
                      <b.icon className="mx-auto h-5 w-5 text-brand-600" />
                      <p className="mt-1 text-xs font-semibold text-ink-900">{b.title}</p>
                      <p className="text-[10px] text-ink-400">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Shop by Category</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Everything you need, all in one place
            </h2>
            <p className="mt-4 text-ink-500 text-balance">
              From t-shirts to outerwear to bags — we've got your brand covered with 13 product categories.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="aspect-[4/5] overflow-hidden bg-ink-50">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold text-white sm:text-base">{c.name}</h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/70">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="why-us" className="bg-ink-50/50 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Three simple steps to custom apparel
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="card relative p-7">
                <span className="absolute right-5 top-5 font-display text-5xl font-bold text-ink-100">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/designer" className="btn-primary">
              Start Designing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Best Sellers</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Featured products
              </h2>
            </div>
            <Link to="/category/t-shirts" className="btn-ghost hidden sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-ink-100" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Decoration methods */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
              Decoration Methods
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              We bring your logo to life
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Screen Printing', desc: 'Vibrant, durable prints ideal for large orders and bold designs.', points: ['Up to 8 colors', 'Best for 24+ pieces', 'Long-lasting ink'] },
              { title: 'Embroidery', desc: 'Professional, textured logos that elevate any garment.', points: ['Up to 7,000 stitches', 'Premium look & feel', 'Great for polos & caps'] },
              { title: 'Heat Transfer & DTG', desc: 'Full-color, photo-quality prints with no minimums.', points: ['No minimums', 'Full color designs', 'Fast turnaround'] },
            ].map((m) => (
              <div key={m.title} className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{m.desc}</p>
                <ul className="mt-4 space-y-2">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-ink-200">
                      <Check className="h-4 w-4 text-brand-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                Ready to put your logo on premium apparel?
              </h2>
              <p className="mt-4 text-brand-100 text-balance">
                Get a free quote today. No minimums on select items. Rush service available.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/designer" className="btn w-full bg-white text-ink-950 hover:bg-ink-100 px-6 py-3 text-sm sm:w-auto">
                  Design Your Shirt
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:18005550199" className="btn w-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 px-6 py-3 text-sm sm:w-auto">
                  Call 1-800-555-0199
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
