import Hero from '@/components/home/hero';
import TrustBar from '@/components/home/trust-bar';
import CategoryGrid from '@/components/home/category-grid';
import WelcomeHomeBundles from '@/components/home/welcome-home-bundles';
import SaleSection from '@/components/home/sale-section';
import FeaturedProducts from '@/components/home/featured-products';
import FieldTested from '@/components/home/field-tested';
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
      <WelcomeHomeBundles />
      <SaleSection />
      <FeaturedProducts />
      <FieldTested />
      <ActiveDogs />
      <WhyUs />
      <ReviewsWall />
      <Newsletter />
    </>
  );
}
