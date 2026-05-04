import Hero from '@/components/home/hero';
import TrustBar from '@/components/home/trust-bar';
import CategoryGrid from '@/components/home/category-grid';
import SaleSection from '@/components/home/sale-section';
import FeaturedProducts from '@/components/home/featured-products';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <SaleSection />
      <FeaturedProducts />
    </>
  );
}
