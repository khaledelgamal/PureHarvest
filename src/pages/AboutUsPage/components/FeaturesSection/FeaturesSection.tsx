import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import { Leaf, Headset, Star, ShoppingBag, Truck, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation('pages/AboutUsPage');

  const features: { icon: React.ReactNode; header: string; description: string }[] = [
    {
      icon: <Leaf className="text-primary" />,
      header: t('featureOrganicFood', '100% Organic food'),
      description: t('featureOrganicFoodDesc', '100% healthy & Fresh food.'),
    },
    {
      icon: <Headset className="text-primary" />,
      header: t('featureGreatSupport', 'Great Support 24/7'),
      description: t('featureGreatSupportDesc', 'Instant access to Contact'),
    },
    {
      icon: <Star className="text-primary" />,
      header: t('featureCustomerFeedback', 'Customer Feedback'),
      description: t('featureCustomerFeedbackDesc', 'Our happy customer'),
    },
    {
      icon: <ShoppingBag className="text-primary" />,
      header: t('featureSecurePayment', '100% Secure Payment'),
      description: t('featureSecurePaymentDesc', 'We ensure your money is save'),
    },
    {
      icon: <Truck className="text-primary" />,
      header: t('featureFreeShipping', 'Free Shipping'),
      description: t('featureFreeShippingDesc', 'Free shipping with discount'),
    },
    {
      icon: <Package className="text-primary" />,
      header: t('featureOrganicPackage', '100% Organic Food'),
      description: t('featureOrganicPackageDesc', '100% healthy & Fresh food.'),
    },
  ];

  return (
    <div className="w-full relative bg-[#FAFAFA] shadow-xs shadow-gray-100 z-0 overflow-hidden">
      {/* Desktop Farm Background */}
      <div 
        className="hidden lg:block absolute top-0 left-0 w-1/2 h-full bg-cover bg-center z-[-1]"
        style={{ backgroundImage: "url('/images/gradient_farm.png')" }}
      />
      <div className={`${sectionContainer} ${sectionPaddingX} flex flex-col lg:flex-row gap-10 lg:gap-8 justify-between items-center py-12 lg:py-0`}>
        <div className="relative w-full lg:flex-1 lg:w-0">
          <img
            src="/images/happy_man_carrying_organic_food_2.png"
            alt="Happy man carrying organic food"
            className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0 relative z-10"
          />
        </div>
        <div className="flex flex-col gap-5 w-full lg:flex-1 lg:w-0">
          <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-semibold">
            {t('featuresTitle', '100% Trusted Organic Food Store')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {t(
              'featuresDescription',
              'Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.',
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 relative z-10">
            {features.map((feature, index) => (
              <div className="flex gap-4 justify-start items-center" key={index}>
                <div className="rounded-full p-4 bg-[#00B2071A] shrink-0">{feature.icon}</div>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="text-gray-900 text-base sm:text-lg font-medium leading-tight">
                    {feature.header}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;
