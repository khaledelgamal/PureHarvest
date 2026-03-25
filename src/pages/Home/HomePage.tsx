import DealOfTheMonth from './components/DealOfTheMonth/DealOfTheMonth';
import Hero from './components/Hero/Hero';
import PromoBanners from './components/PromoBanners/PromoBanners';
import ServiceFeatures from './components/ServiceFeatures/ServiceFeatures';
import Testimonials from './components/Testimonials/Testimonials';
import VideoBanner from './components/VideoBanner/VideoBanner';

const HomePage = () => {
  return (
    <main className="bg-green-gray-50">
      <Hero />
      <ServiceFeatures />
      {/* TODO, ProductShowcase section */}
      <PromoBanners />
      <DealOfTheMonth />
      {/* TODO: <FeaturedProducts /> */}

      <Testimonials />
      <VideoBanner />
      {/* TODO: <LatestNews /> */}
      {/* TODO: <Newsletter /> */}
    </main>
  );
};
export default HomePage;
