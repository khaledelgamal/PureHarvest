import ClientTestimonailSection from './components/ClientTestimonailSection/ClientTestimonailSection';
import DeliveryCallToActionSection from './components/DeliveryCallToActionSection/DeliveryCallToActionSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import IntroductorySection from './components/IntroductorySection/IntroductorySection';
import TeamSection from './components/TeamSection/TeamSection';
import PartnersSection from './components/PartnersSection/PartnersSection';
import './embla.css';
const AboutUsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <IntroductorySection />
      <FeaturesSection />
      <DeliveryCallToActionSection />
      <TeamSection />
      <ClientTestimonailSection />
      <PartnersSection />
    </div>
  );
};
export default AboutUsPage;
