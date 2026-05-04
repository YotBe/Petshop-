import Hero from '@/components/home/hero';
import TrustBar from '@/components/home/trust-bar';
import CategoryGrid from '@/components/home/category-grid';
import SaleSection from '@/components/home/sale-section';
import FeaturedProducts from '@/components/home/featured-products';
import ActiveDogs from '@/components/home/active-dogs';
import WhyUs from '@/components/home/why-us';
import ReviewsWall from '@/components/home/reviews-wall';
import Newsletter from '@/components/home/newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <SaleSection />
      <FeaturedProducts />
      <ActiveDogs />
      <WhyUs />
      <ReviewsWall />
      <Newsletter />
    </>
  );
}
