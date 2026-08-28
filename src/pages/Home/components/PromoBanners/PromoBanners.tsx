import { sectionContainer } from '@/constants/global.styles';
import { Button } from '@/components/Buttons/Button/Button';
import ArrowIcon from '@/icons/ArrowIcon';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import type { MouseEventHandler } from 'react';

const PromoBanners = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('pages/Home');

  const handleShopNow = () => navigate(routePaths.SHOP.ROOT);

  return (
    <section className="bg-white py-[100px]">
      <div className={`${sectionContainer} flex items-center gap-4.5`}>
        {/* Milk Banner */}
        <div className="relative flex-1 h-[255px] rounded-lg overflow-hidden">
          <img
            src="/images/promo-milk.png"
            alt="Fresh Cow Milk"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
            <h3 className="text-[32px] font-semibold leading-tight text-white mb-3">
              {t('milkTitle', '100% Fresh')}
              <br />
              {t('milkTitle2', 'Cow Milk')}
            </h3>
            <div className="flex items-center gap-1.5 mb-4 text-white/80">
              <span className="text-sm">{t('milkDescription', 'Starting at')}</span>
              <PriceDisplay price={14.99} size="lg" priceClassName="text-white" />
            </div>
            <ShopNowButton onClick={handleShopNow} />
          </div>
        </div>

        {/* Cola Banner */}
        <div className="relative flex-1 h-[255px] rounded-lg overflow-hidden">
          <img
            src="/images/promo-cola.png"
            alt="Water & Soft Drink"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-end text-right justify-center h-full p-8 ml-auto">
            <span className="text-xs font-medium uppercase tracking-wider mb-2 text-green-gray-900/60">
              {t('colaSubtitle', 'DRINK SALE')}
            </span>
            <h3 className="text-[32px] font-semibold leading-tight text-green-gray-900 mb-3">
              {t('colaTitle', 'Water &')}
              <br />
              {t('colaTitle2', 'Soft Drink')}
            </h3>
            <ShopNowButton onClick={handleShopNow} />
          </div>
        </div>

        {/* Legumes Banner */}
        <div className="relative flex-1 h-[255px] rounded-lg overflow-hidden">
          <img
            src="/images/promo-legumes.png"
            alt="Quick Breakfast"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
            <span className="text-xs font-medium uppercase tracking-wider mb-2 text-green-gray-900/60">
              {t('legumesSubtitle', '100% ORGANIC')}
            </span>
            <h3 className="text-[32px] font-semibold leading-tight text-green-gray-900 mb-3">
              {t('legumesTitle', 'Quick')}
              <br />
              {t('legumesTitle2', 'Breakfast')}
            </h3>
            <ShopNowButton onClick={handleShopNow} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;

const ShopNowButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { t } = useTranslation('pages/Home');

  return (
    <Button
      className="flex gap-4 items-center font-medium bg-white text-primary 
        rounded-full px-6 py-3 hover:text-white transition-colors duration-300"
      onClick={onClick}
    >
      <span>{t('shopNow', 'Shop Now')}</span>
      <ArrowIcon />
    </Button>
  );
};
