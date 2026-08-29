import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer } from '@/constants/global.styles';
import ArrowIcon from '@/icons/ArrowIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation('pages/Home');

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
            <span className="font-medium">{t('off', 'OFF')}</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-start">
          <p
            className="text-primary text-sm font-poppins mb-2"
            style={{ fontFamily: "'Segoe Script', cursive, sans-serif" }}
          >
            {t('welcomeTo', 'WELCOME TO')} {companyInfo.name.toUpperCase()}
          </p>
          <h1 className="text-[56px] text-green-gray-900 font-semibold leading-[120%] mb-5">
            {t('freshHealthy', 'Fresh & Healthy')} <br /> {t('organicFood', 'Organic Food')}
          </h1>
          <p className="text-green-gray-500 text-lg mb-8">
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
