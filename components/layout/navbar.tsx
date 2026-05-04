'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, ChevronDown, Dog } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/products';
import CartButton from '@/components/cart/cart-button';

export default function Navbar() {
  const [showCats, setShowCats] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Dog className="h-6 w-6 text-brand" />
          <span>פטשופ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/products" className="px-3 py-2 text-sm font-medium hover:text-brand">
            כל המוצרים
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowCats(true)}
            onMouseLeave={() => setShowCats(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-brand">
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
                    <div className="text-xs text-slate-500">{c.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/admin" className="px-3 py-2 text-sm font-medium hover:text-brand">
            ניהול
          </Link>
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
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="פתח תפריט"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container py-3 flex flex-col gap-1">
            <form action="/products" className="relative mb-2">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input name="q" placeholder="חיפוש..." className="ps-9" />
            </form>
            <Link href="/products" className="px-2 py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
              כל המוצרים
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="px-2 py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {c.title}
              </Link>
            ))}
            <Link href="/admin" className="px-2 py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
              ניהול
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
