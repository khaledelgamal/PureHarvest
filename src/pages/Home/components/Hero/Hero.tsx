import { Button } from '@/components/Buttons/Button/Button';
import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer } from '@/constants/global.styles';
import ArrowIcon from '@/icons/ArrowIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const tRoute = 'pages.Home.components.Hero';
const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-white py-[68px]">
      <div className={`${sectionContainer} flex items-center gap-4.5`}>
        {/* Hero Image */}
        <div className="relative">
          <img
            src="/images/hero.png"
            alt="fresh and healthy organic food image"
            width={795}
            height={564}
          />
          <div className="absolute top-32 right-16 p-5 bg-warn rounded-full flex flex-col items-center justify-center text-white">
            <span className="text-[32px] leading-[120%] font-semibold">70%</span>
            <span className="font-medium">{t(`${tRoute}.off`, 'OFF')}</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-start">
          <p
            className="text-primary text-sm font-poppins mb-2"
            style={{ fontFamily: "'Segoe Script', cursive, sans-serif" }}
          >
            {t(`${tRoute}.welcomeTo`, `WELCOME TO`)} {companyInfo.name.toUpperCase()}
          </p>
          <h1 className="text-[56px] text-green-gray-900 font-semibold leading-[120%] mb-5">
            {t(`${tRoute}.freshHealthy`, 'Fresh & Healthy')} <br />{' '}
            {t(`${tRoute}.organicFood`, 'Organic Food')}
          </h1>
          <p className="text-green-gray-500 text-lg mb-8">
            {t(`${tRoute}.freeShipping`, 'Free shipping on all your order. we deliver, you enjoy')}
          </p>
          <Button
            className="flex gap-4 items-center font-medium"
            onClick={() => {
              navigate(routePaths.SHOP.ROOT);
            }}
          >
            <span>{t(`${tRoute}.shopNow`, 'Shop now')}</span>
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
