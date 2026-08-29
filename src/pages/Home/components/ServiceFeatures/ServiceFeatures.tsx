import { useState } from 'react';
import { sectionContainer } from '@/constants/global.styles';
import DeliveryTruckIcon from '@/icons/DeliveryTruckIcon';
import HeadphonesIcon from '@/icons/HeadphonesIcon';
import PackageIcon from '@/icons/PackageIcon';
import ShoppingBagIcon from '@/icons/ShoppingBagIcon';
import { useTranslation } from 'react-i18next';

const ServiceFeatures = () => {
  const { t } = useTranslation('pages/Home');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If nothing is hovered, default to first item
  const activeIndex = hoveredIndex ?? 0;

  const serviceFeatures = [
    {
      icon: <DeliveryTruckIcon className="w-10 h-10" />,
      title: t('freeShippingTitle', 'Free Shipping'),
      description: t('freeShippingDescription', 'Free shipping with discount'),
    },
    {
      icon: <HeadphonesIcon className="w-10 h-10" />,
      title: t('greatSupport', 'Great Support 24/7'),
      description: t('greatSupportDescription', 'Instant access to Contact'),
    },
    {
      icon: <ShoppingBagIcon className="w-10 h-10" />,
      title: t('securePayment', '100% Secure Payment'),
      description: t('securePaymentDescription', 'We ensure your money is save'),
    },
    {
      icon: <PackageIcon className="w-10 h-10" />,
      title: t('moneyBack', 'Money-Back Guarantee'),
      description: t('moneyBackDescription', '30 days money-back guarantee'),
    },
  ];

  return (
    <section className="bg-linear-to-b from-white from-50% to-green-gray-50 to-50% py-[50px]">
      <div className={`${sectionContainer}`}>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-lg overflow-hidden shadow-sm">
          {serviceFeatures.map(({ icon, description, title }, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`h-[222px] w-full p-8 lg:p-10 border
                  flex flex-col items-center md:items-start justify-center text-center md:text-left
                  transition-all duration-300 cursor-pointer
                  ${isActive ? 'bg-primary border-primary' : 'bg-white border-gray-100'}`}
              >
                {/* Icon Circle */}
                <div
                  className={`flex-center p-[15px] rounded-full border
                    transition-all duration-300 mb-4 bg-white text-primary
                    ${isActive ? 'border-transparent' : 'border-green-gray-100'}`}
                >
                  {icon}
                </div>

                {/* Title */}
                <h3
                  className={`leading-[150%] text-lg font-semibold mb-2 
                    transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-gray-900'}`}
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  className={`leading-[150%] text-sm 
                    transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-gray-400'}`}
                >
                  {description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServiceFeatures;
