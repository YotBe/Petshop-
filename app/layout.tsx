import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CartDrawer from '@/components/cart/cart-drawer';

export const metadata: Metadata = {
  title: 'Petshop — Premium Gear for Your Active Companion',
  description:
    'Curated, durable gear for adventurous dogs: harnesses, leashes, outdoor essentials, training tools, and interactive toys.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
