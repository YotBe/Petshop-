import Link from 'next/link';
import { Shield, Mountain, Gamepad2, GraduationCap } from 'lucide-react';
import { CATEGORIES } from '@/lib/products';

const ICONS = { Shield, Mountain, Gamepad2, GraduationCap };

export default function CategoryGrid() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl md:text-3xl font-bold">Shop by category</h2>
      <p className="mt-2 text-slate-600">Curated gear for every adventure.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon as keyof typeof ICONS] ?? Shield;
          return (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-semibold group-hover:text-brand">{c.title}</div>
                <div className="text-sm text-slate-600">{c.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
