import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import ArrowIcon from '@/icons/ArrowIcon';
import { useTranslation } from 'react-i18next';

const DeliveryCallToActionSection = () => {
  const { t } = useTranslation('pages/AboutUsPage');

  const pros = [
    t('deliveryPro1', 'Sed in metus pellentesque.'),
    t('deliveryPro2', 'Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.'),
    t('deliveryPro3', 'Maecenas ut nunc fringilla erat varius.'),
  ];

  return (
    <div className={`${sectionContainer} ${sectionPaddingX} mt-12 lg:mt-20 mb-12 lg:mb-20`}>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-11 w-full">
        <div className="flex flex-col gap-5 lg:gap-6 w-full lg:flex-1 lg:w-0">
          <h4 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            {t('deliveryTitle', 'We Delivered, You Enjoy Your Order.')}
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            {t(
              'deliveryDescription',
              'Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit dapibus eu. Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor bibendum nunc eget elementum.',
            )}
          </p>
          <div className="flex flex-col gap-3 lg:gap-4 mt-2">
            {pros.map((pro, index) => (
              <div key={index} className="flex items-start lg:items-center gap-3">
                <div className="w-5 h-5 shrink-0 mt-0.5 lg:mt-0 p-1 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-600 text-sm">{pro}</span>
              </div>
            ))}
          </div>
          <ButtonLink
            to="/shop"
            variant="fill"
            size="lg"
            className="flex gap-4 items-center font-medium w-fit mt-2 lg:mt-4"
          >
            {t('shopNow', 'Shop Now')}
            <ArrowIcon />
          </ButtonLink>
        </div>
        <img
          src="/images/happy_asian_carrying_box_of_food.png"
          alt="Happy Asian Customer"
          className="w-full lg:flex-1 lg:w-0 min-h-[250px] lg:min-h-150 object-cover max-w-md lg:max-w-none rounded-xl lg:rounded-none"
        />
      </div>
    </div>
  );
};
export default DeliveryCallToActionSection;
