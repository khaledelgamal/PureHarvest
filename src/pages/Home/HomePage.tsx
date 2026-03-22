import DealOfTheMonth from './components/DealOfTheMonth/DealOfTheMonth';
import Hero from './components/Hero/Hero';
import PromoBanners from './components/PromoBanners/PromoBanners';
import ServiceFeatures from './components/ServiceFeatures/ServiceFeatures';

const HomePage = () => {
  return (
    <main className="bg-green-gray-50">
      <Hero />
      <ServiceFeatures />
      {/* TODO, ProductShowcase section */}
      <PromoBanners />
      <DealOfTheMonth />
      {/* <FeaturedProducts />
      <Testimonials />
      <VideoBanner />
      <LatestNews />
      <Newsletter /> */}
    </main>
  );
};
export default HomePage;
