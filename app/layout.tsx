import type { Metadata } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import PromoBar from '@/components/layout/promo-bar';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import CartDrawer from '@/components/cart/cart-drawer';
import AuthSessionProvider from '@/components/auth/session-provider';

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'פטשופ',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://petshop-two-ruby.vercel.app',
              logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://petshop-two-ruby.vercel.app'}/icon.png`,
              email: 'hello@petshop.co.il',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+972-55-881-0183',
                  contactType: 'customer support',
                  areaServed: 'IL',
                  availableLanguage: ['Hebrew', 'English']
                }
              ],
              sameAs: ['https://instagram.com', 'https://facebook.com']
            })
          }}
        />
        <AuthSessionProvider>
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
        </AuthSessionProvider>
      </body>
    </html>
  );
}
