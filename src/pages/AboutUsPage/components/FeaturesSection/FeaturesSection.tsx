import { sectionContainer } from '@/constants/global.styles';
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
    <div
      className="w-full bg-no-repeat shadow-xs shadow-gray-100"
      style={{
        backgroundImage: `
      linear-gradient(#FAFAFA, #FAFAFA),
      url('/images/gradient_farm.png')
    `,
        backgroundSize: '50% 100%, 50% 100%',
        backgroundPosition: 'right, left',
      }}
    >
      <div className={`${sectionContainer} flex gap-8 justify-between items-center`}>
        <img
          src="/images/happy_man_carrying_organic_food_2.png"
          alt="Happy man carrying organic food"
          className="flex-1 w-0"
        />
        <div className="flex flex-col gap-5 flex-1 w-0">
          <h2 className="text-gray-900 text-6xl font-semibold">
            {t('featuresTitle', '100% Trusted Organic Food Store')}
          </h2>
          <p className="text-gray-600 text-md">
            {t(
              'featuresDescription',
              'Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor tincidunt feugiat.',
            )}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div className="flex gap-4 justify-start items-center" key={index}>
                <div className="rounded-full p-4 bg-[#00B2071A]">{feature.icon}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-900 text-lg font-medium">{feature.header}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
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
