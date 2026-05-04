'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, ChevronDown, PawPrint } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/products';
import CartButton from '@/components/cart/cart-button';
import MobileMenu from '@/components/layout/mobile-menu';
import { cn } from '@/lib/utils';

const PRIMARY_LINKS = [
  { href: '/products', label: 'כל המוצרים' },
  { href: '/bundles', label: 'ערכות' },
  { href: '/#deals', label: 'מבצעים' },
  { href: '/#top-rated', label: 'הכי מדורג' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' }
] as const;

function isActive(pathname: string, href: string) {
  if (href.startsWith('/#')) return false;
  if (href === '/products') return pathname.startsWith('/products');
  if (href === '/bundles') return pathname.startsWith('/bundles');
  if (href === '/about') return pathname === '/about';
  if (href === '/contact') return pathname === '/contact';
  return pathname === href;
}

export default function Navbar() {
  const [showCats, setShowCats] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-lg text-ink"
        >
          <PawPrint className="h-6 w-6 text-brand" />
          <span className="font-display">פטשופ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {PRIMARY_LINKS.map((l, i) => {
            const active = isActive(pathname, l.href);
            // Insert "קטגוריות" dropdown after the first link
            return (
              <span key={l.href} className="contents">
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition',
                    active
                      ? 'text-brand'
                      : 'text-ink hover:text-brand'
                  )}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-brand"
                    />
                  )}
                </Link>
                {i === 0 && (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowCats(true)}
                    onMouseLeave={() => setShowCats(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink hover:text-brand">
                      קטגוריות <ChevronDown className="h-4 w-4" />
                    </button>
                    {showCats && (
                      <div className="absolute start-0 top-full w-64 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/products?category=${c.slug}`}
                            className="block rounded px-3 py-2 text-sm hover:bg-slate-100"
                          >
                            <div className="font-medium">{c.title}</div>
                            <div className="text-xs text-slate-500">
                              {c.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </span>
            );
          })}
        </nav>

        <form
          action="/products"
          className="relative ms-auto hidden flex-1 max-w-sm md:block"
        >
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="q"
            placeholder="חיפוש רתמות, צעצועים, ציוד..."
            className="ps-9"
          />
        </form>

        <div className="ms-auto md:ms-0 flex items-center gap-2">
          <CartButton />
          <button
            className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-md text-ink hover:bg-slate-100 active:bg-slate-200 touch-manipulation"
            onClick={() => setMobileOpen(true)}
            aria-label="פתח תפריט"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
