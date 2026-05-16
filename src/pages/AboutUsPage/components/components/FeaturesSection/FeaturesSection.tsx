import { sectionContainer } from '@/constants/global.styles';

import { Leaf, Headset, Star, ShoppingBag, Truck, Package } from 'lucide-react';

const features: { icon: React.ReactNode; header: string; description: string }[] = [
  {
    icon: <Leaf className="text-primary" />,
    header: '100% Organic food',
    description: '100% healthy & Fresh food.',
  },
  {
    icon: <Headset className="text-primary" />,
    header: 'Great Support 24/7',
    description: 'Instant access to Contact',
  },
  {
    icon: <Star className="text-primary" />,
    header: 'Customer Feedback',
    description: 'Our happy customer',
  },
  {
    icon: <ShoppingBag className="text-primary" />,
    header: '100% Sucure Payment',
    description: 'We ensure your money is save',
  },
  {
    icon: <Truck className="text-primary" />,
    header: 'Free Shipping',
    description: 'Free shipping with discount',
  },
  {
    icon: <Package className="text-primary" />,
    header: '100% Organic Food',
    description: '100% healthy & Fresh food.',
  },
];
const FeaturesSection = () => {
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
          <h2 className="text-gray-900 text-6xl font-semibold">100% Trusted Organic Food Store</h2>
          <p className="text-gray-600 text-md">
            Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus
            neque. Duis non diam eget est luctus tincidunt a a mi. Nulla eu eros consequat tortor
            tincidunt feugiat.
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
