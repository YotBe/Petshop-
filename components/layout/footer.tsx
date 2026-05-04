import Link from 'next/link';
import { Dog } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <Dog className="h-5 w-5 text-brand" />
            <span>Petshop</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Premium gear for your active companion.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/products">All products</Link></li>
            <li><Link href="/products?category=harnesses-leashes">Harnesses & Leashes</Link></li>
            <li><Link href="/products?category=outdoor-gear">Outdoor Gear</Link></li>
            <li><Link href="/products?category=interactive-toys">Toys</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Help</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Shipping &amp; Returns</li>
            <li>Sizing Guide</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Stay in the loop</h4>
          <p className="mt-3 text-sm text-slate-600">
            New gear, drops, and trail-tested gear reviews.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Petshop. All rights reserved.
      </div>
    </footer>
  );
}
