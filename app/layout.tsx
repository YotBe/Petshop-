import type { Metadata } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import PromoBar from '@/components/layout/promo-bar';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import CartDrawer from '@/components/cart/cart-drawer';

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  variable: '--font-heebo'
});

const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-rubik'
});

export const metadata: Metadata = {
  title: 'פטשופ — ציוד מובחר לחיות שאנחנו אוהבים',
  description:
    'חנות ישראלית לציוד פרימיום לחיות מחמד: רתמות ורצועות, ציוד חוץ, מיטות, צעצועים אינטראקטיביים, אילוף, האכלה והשתייה. שירות בעברית, משלוח מהיר, החזרות קלות.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className={heebo.className}>
        <PromoBar />
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <CartDrawer />
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-center"
          dir="rtl"
          richColors
          closeButton
          toastOptions={{ className: 'font-sans' }}
        />
      </body>
    </html>
  );
}
