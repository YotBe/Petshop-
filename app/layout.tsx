import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CartDrawer from '@/components/cart/cart-drawer';

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  variable: '--font-heebo'
});

export const metadata: Metadata = {
  title: 'פטשופ — ציוד פרימיום לחבר הפעיל שלך',
  description:
    'ציוד מובחר ועמיד לכלבים הרפתקנים: רתמות, רצועות, ציוד שטח, כלי אילוף וצעצועים אינטראקטיביים.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className={heebo.className}>
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
