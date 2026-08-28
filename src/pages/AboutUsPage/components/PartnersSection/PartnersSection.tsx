import { sectionContainer } from '@/constants/global.styles';
import StepsIcon from '@/icons/partners/StepsIcon';
import MangoIcon from '@/icons/partners/MangoIcon';
import FoodNetworkIcon from '@/icons/partners/FoodNetworkIcon';
import FoodCOUKIcon from '@/icons/partners/FoodCOUKIcon';
import BookOffIcon from '@/icons/partners/BookOffIcon';
import GSeriesIcon from '@/icons/partners/GSeriesIcon';

const partners = [
  { id: 1, Icon: StepsIcon },
  { id: 2, Icon: MangoIcon },
  { id: 3, Icon: FoodNetworkIcon },
  { id: 4, Icon: FoodCOUKIcon },
  { id: 5, Icon: BookOffIcon },
  { id: 6, Icon: GSeriesIcon },
];

const PartnersSection = () => {
  return (
    <div className="py-20 bg-white border-t border-gray-100 hidden md:block">
      <div
        className={`${sectionContainer} flex flex-wrap items-center justify-center gap-y-10 lg:justify-between lg:gap-y-0`}
      >
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`flex flex-1 grow items-center justify-center px-8 ${
              index !== partners.length - 1 ? 'lg:border-r lg:border-gray-200' : ''
            }`}
          >
            <partner.Icon className="text-gray-300 hover:text-[#D8259B] transition-colors duration-300 w-full max-w-[120px] h-auto cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
