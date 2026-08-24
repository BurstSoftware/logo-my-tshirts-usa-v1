import { Link } from 'react-router-dom';
import { Shirt, Phone, Mail, MapPin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { categories } from '@/lib/categories';

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-ink-100 bg-ink-50/50">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Shirt className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-bold text-ink-950">
                Logo My Shirts<span className="text-brand-600"> USA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-500">
              Custom logo apparel and promotional products. Screen printing, embroidery, and more — proudly made in the USA.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-500">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-600" />
                1-800-555-0199
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-600" />
                sales@logomyshirtsusa.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600" />
                123 Industry Way, Charlotte, NC 28202
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-ink-500 ring-1 ring-ink-200 transition-colors hover:bg-brand-600 hover:text-white hover:ring-brand-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="text-sm font-semibold text-ink-950">Shop</h4>
              <ul className="mt-4 space-y-2">
                {categories.slice(0, 7).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/category/${c.slug}`} className="text-sm text-ink-500 hover:text-brand-700">
                      {c.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-950">More</h4>
              <ul className="mt-4 space-y-2">
                {categories.slice(7).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/category/${c.slug}`} className="text-sm text-ink-500 hover:text-brand-700">
                      {c.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-950">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/designer" className="text-sm text-ink-500 hover:text-brand-700">Logo Designer</Link></li>
                <li><a href="#" className="text-sm text-ink-500 hover:text-brand-700">About Us</a></li>
                <li><a href="#" className="text-sm text-ink-500 hover:text-brand-700">Decoration Guide</a></li>
                <li><a href="#" className="text-sm text-ink-500 hover:text-brand-700">Request a Quote</a></li>
                <li><a href="#" className="text-sm text-ink-500 hover:text-brand-700">FAQ</a></li>
                <li><a href="#" className="text-sm text-ink-500 hover:text-brand-700">Shipping</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row">
          <p className="text-xs text-ink-400">© {new Date().getFullYear()} Logo My Shirts USA. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-ink-400">
            <a href="#" className="hover:text-brand-700">Privacy Policy</a>
            <a href="#" className="hover:text-brand-700">Terms of Service</a>
            <a href="#" className="hover:text-brand-700">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
