import { Button } from '@/components/Buttons/Button/Button';
import ArrowIcon from '@/icons/ArrowIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';

const DEAL_END_DATE = new Date('2026-07-31T23:59:59');

const tRoute = 'pages.Home.components.DealOfTheMonth';
const DealOfTheMonth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="bg-green-gray-50 overflow-hidden relative min-h-[400px]">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Left image */}
        <div className="flex items-center justify-center w-[30%] max-w-[521px] ">
          <img
            src="/images/best-deals-1.png"
            alt="best deals 1"
            className="hidden xl:block shrink-0 h-auto object-contain self-end"
          />
        </div>

        {/* Center content */}
        <div className="flex flex-col gap-6 justify-center items-center py-10 px-6 flex-1 min-w-0">
          <div className="flex flex-col gap-3">
            <span className="text-primary text-xs font-medium uppercase text-center">
              {t(`${tRoute}.bestDeals`, 'BEST DEALS')}
            </span>
            <h3 className="text-green-gray-900 text-2xl sm:text-3xl lg:text-[40px] text-center font-semibold leading-tight">
              {t(`${tRoute}.ourSpecialProducts`, 'Our Special Products')}
            </h3>
            <h3 className="text-green-gray-900 text-2xl sm:text-3xl lg:text-[40px] font-semibold text-center leading-tight">
              {t(`${tRoute}.dealOfTheMonth`, 'Deal Of The Month')}
            </h3>
          </div>

          <CountdownTimer targetDate={DEAL_END_DATE} />

          <Button
            className="flex gap-4 items-center font-medium"
            onClick={() => navigate(routePaths.SHOP.ROOT)}
            size="md"
          >
            <span>{t(`${tRoute}.shopNow`, 'Shop now')}</span>
            <ArrowIcon />
          </Button>
        </div>

        {/* Right image */}
        <img
          src="/images/best-deals-2.png"
          alt="best deals 2"
          className="hidden xl:block shrink-0 w-[35%] max-w-[704px] h-auto object-contain self-end"
        />
      </div>
    </section>
  );
};
export default DealOfTheMonth;
