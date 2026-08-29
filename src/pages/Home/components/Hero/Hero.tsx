import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer } from '@/constants/global.styles';
import ArrowIcon from '@/icons/ArrowIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation('pages/Home');

  return (
    <section className="bg-white py-10 lg:py-[68px]">
      <div
        className={`${sectionContainer} flex flex-col lg:flex-row items-center gap-8 lg:gap-4.5`}
      >
        {/* Hero Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <img
            src="/images/hero.png"
            alt="fresh and healthy organic food image"
            width={795}
            height={564}
            className="w-full max-w-[795px] h-auto object-contain"
          />
          <div className="absolute top-[10%] right-[5%] lg:top-32 lg:right-16 p-4 lg:p-5 bg-warn rounded-full flex flex-col items-center justify-center text-white scale-75 md:scale-100 origin-center">
            <span className="text-[24px] lg:text-[32px] leading-[120%] font-semibold">70%</span>
            <span className="font-medium text-sm lg:text-base">{t('off', 'OFF')}</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
          <p
            className="text-primary text-sm font-poppins mb-2"
            style={{ fontFamily: "'Segoe Script', cursive, sans-serif" }}
          >
            {t('welcomeTo', 'WELCOME TO')} {companyInfo.name.toUpperCase()}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] text-green-gray-900 font-semibold leading-[120%] mb-4 lg:mb-5">
            {t('freshHealthy', 'Fresh & Healthy')} <br /> {t('organicFood', 'Organic Food')}
          </h1>
          <p className="text-green-gray-500 text-base lg:text-lg mb-6 lg:mb-8 max-w-md lg:max-w-none">
            {t('freeShipping', 'Free shipping on all your order. we deliver, you enjoy')}
          </p>
          <ButtonLink to={routePaths.SHOP.ROOT} className="flex gap-4 items-center font-medium">
            <span>{t('shopNow', 'Shop now')}</span>
            <ArrowIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
export default Hero;
