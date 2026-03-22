import { sectionContainer } from '@/constants/global.styles';
import { Button } from '@/components/Buttons/Button/Button';
import ArrowIcon from '@/icons/ArrowIcon';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import type { MouseEventHandler } from 'react';

const tRoute = 'pages.Home.components.PromoBanners';

const PromoBanners = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              {t(`${tRoute}.milkTitle`, '100% Fresh')}
              <br />
              {t(`${tRoute}.milkTitle2`, 'Cow Milk')}
            </h3>
            <div className="flex items-center gap-1.5 mb-4 text-white/80">
              <span className="text-sm">{t(`${tRoute}.milkDescription`, 'Starting at')}</span>
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
              {t(`${tRoute}.colaSubtitle`, 'DRINK SALE')}
            </span>
            <h3 className="text-[32px] font-semibold leading-tight text-green-gray-900 mb-3">
              {t(`${tRoute}.colaTitle`, 'Water &')}
              <br />
              {t(`${tRoute}.colaTitle2`, 'Soft Drink')}
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
              {t(`${tRoute}.legumesSubtitle`, '100% ORGANIC')}
            </span>
            <h3 className="text-[32px] font-semibold leading-tight text-green-gray-900 mb-3">
              {t(`${tRoute}.legumesTitle`, 'Quick')}
              <br />
              {t(`${tRoute}.legumesTitle2`, 'Breakfast')}
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
  const { t } = useTranslation();

  return (
    <Button
      className="flex gap-4 items-center font-medium bg-white text-primary 
        rounded-full px-6 py-3 hover:text-white transition-colors duration-300"
      onClick={onClick}
    >
      <span>{t(`${tRoute}.shopNow`, 'Shop Now')}</span>
      <ArrowIcon />
    </Button>
  );
};
