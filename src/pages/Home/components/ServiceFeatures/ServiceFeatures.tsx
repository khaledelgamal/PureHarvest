import { useState } from 'react';
import { sectionContainer } from '@/constants/global.styles';
import DeliveryTruckIcon from '@/icons/DeliveryTruckIcon';
import HeadphonesIcon from '@/icons/HeadphonesIcon';
import PackageIcon from '@/icons/PackageIcon';
import ShoppingBagIcon from '@/icons/ShoppingBagIcon';
import { useTranslation } from 'react-i18next';

const tRoute = 'pages.Home.components.ServiceFeatures';
const ServiceFeatures = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If nothing is hovered, default to first item
  const activeIndex = hoveredIndex ?? 0;

  const serviceFeatures = [
    {
      icon: <DeliveryTruckIcon className="w-10 h-10" />,
      title: t(`${tRoute}.freeShipping`, 'Free Shipping'),
      description: t(`${tRoute}.freeShippingDescription`, 'Free shipping with discount'),
    },
    {
      icon: <HeadphonesIcon className="w-10 h-10" />,
      title: t(`${tRoute}.greatSupport`, 'Great Support 24/7'),
      description: t(`${tRoute}.greatSupportDescription`, 'Instant access to Contact'),
    },
    {
      icon: <ShoppingBagIcon className="w-10 h-10" />,
      title: t(`${tRoute}.securePayment`, '100% Secure Payment'),
      description: t(`${tRoute}.securePaymentDescription`, 'We ensure your money is save'),
    },
    {
      icon: <PackageIcon className="w-10 h-10" />,
      title: t(`${tRoute}.moneyBack`, 'Money-Back Guarantee'),
      description: t(`${tRoute}.moneyBackDescription`, '30 days money-back guarantee'),
    },
  ];

  return (
    <section className="bg-linear-to-b from-white from-50% to-green-gray-50 to-50% py-[50px]">
      <div className={`${sectionContainer}`}>
        <ul className="flex rounded-lg overflow-hidden">
          {serviceFeatures.map(({ icon, description, title }, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`h-[222px] w-[330px] p-10 border
                  flex flex-col items-start justify-center 
                  transition-all duration-300 cursor-pointer
                  ${index === 0 ? 'rounded-l-lg' : index === serviceFeatures.length - 1 ? 'rounded-r-lg' : ''}
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
