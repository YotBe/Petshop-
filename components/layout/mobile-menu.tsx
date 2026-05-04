'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  ChevronDown,
  PawPrint,
  ShoppingBag,
  Tag,
  Star,
  Info,
  Mail,
  Truck,
  Ruler,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/products';
import SignInButton from '@/components/auth/sign-in-button';

const PRIMARY_LINKS = [
  { href: '/products', label: 'כל המוצרים', Icon: ShoppingBag },
  { href: '/bundles', label: 'ערכות ברוכים הבאים', Icon: Sparkles },
  { href: '/#deals', label: 'מבצעים', Icon: Tag },
  { href: '/#top-rated', label: 'הכי מדורג', Icon: Star },
  { href: '/about', label: 'אודות', Icon: Info },
  { href: '/contact', label: 'צור קשר', Icon: Mail }
] as const;

const HELP_LINKS = [
  { href: '/shipping', label: 'משלוחים והחזרות', Icon: Truck },
  { href: '/size-guide', label: 'מדריך מידות', Icon: Ruler }
] as const;

export default function MobileMenu({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [catsOpen, setCatsOpen] = useState(false);
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="overflow-y-auto bg-gradient-to-b from-white via-white to-cream"
      >
        <SheetHeader className="border-b-0 pb-2">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2 font-extrabold text-lg text-ink"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-display">פטשופ</span>
          </Link>
          <SheetTitle className="sr-only">תפריט ראשי</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 px-5 pb-8 pt-3">
          <form action="/products" className="relative" onSubmit={close}>
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              name="q"
              placeholder="חיפוש רתמות, צעצועים, ציוד..."
              className="ps-9"
              autoComplete="off"
            />
          </form>

          <nav aria-label="ראשי">
            <ul className="space-y-1">
              {PRIMARY_LINKS.map(({ href, label, Icon }, i) => (
                <li
                  key={href}
                  className="menu-item-in"
                  style={{ animationDelay: `${60 + i * 40}ms` }}
                >
                  <Link
                    href={href}
                    onClick={close}
                    className="group flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-3 py-3.5 text-[15px] font-medium text-ink transition active:bg-slate-100 hover:bg-slate-50 touch-manipulation"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 group-hover:bg-brand/10 group-hover:text-brand transition">
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </span>
                    <ArrowLeft className="h-4 w-4 text-slate-300 transition group-hover:text-brand group-hover:-translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="menu-item-in rounded-2xl border border-slate-200 bg-white"
            style={{ animationDelay: '300ms' }}
          >
            <button
              type="button"
              onClick={() => setCatsOpen((v) => !v)}
              aria-expanded={catsOpen}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-start touch-manipulation"
            >
              <span className="text-sm font-bold text-ink">קטגוריות</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition ${catsOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {catsOpen && (
              <ul className="border-t border-slate-100 px-2 pb-2 pt-1">
                {CATEGORIES.map((c, i) => (
                  <li
                    key={c.slug}
                    className="menu-item-in"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <Link
                      href={`/products?category=${c.slug}`}
                      onClick={close}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                    >
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-slate-500">
                        {c.description}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="menu-item-in"
            style={{ animationDelay: '340ms' }}
          >
            <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              עזרה
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {HELP_LINKS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 hover:border-brand hover:text-brand active:bg-slate-50"
                  >
                    <Icon className="h-4 w-4 text-slate-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="menu-item-in pt-2"
            style={{ animationDelay: '400ms' }}
          >
            <SignInButton onAction={close} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
