import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';

const IntroductorySection = () => {
  const { t } = useTranslation('pages/AboutUsPage');

  return (
    <div
      className={`${sectionContainer} ${sectionPaddingX} flex flex-col-reverse lg:flex-row gap-10 lg:gap-14 my-12 lg:my-20 items-center justify-between`}
    >
      <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-0 lg:flex-1">
        <h2 className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl font-semibold">
          {t('introTitle', '100% Trusted Organic Food Store')}
        </h2>
        <p className="text-gray-600 text-base lg:text-lg">
          {t(
            'introDescription',
            'Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.',
          )}
        </p>
      </div>
      <img
        src="/images/happy_man_carrying_organic_food.png"
        alt="Happy man carrying organic food"
        className="w-full lg:flex-1 lg:w-0 max-w-md lg:max-w-none"
      />
    </div>
  );
};
export default IntroductorySection;
