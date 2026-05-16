import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { sectionContainer } from '@/constants/global.styles';
import ArrowIcon from '@/icons/ArrowIcon';

const DeliveryCallToActionSection = () => {
  const pros = [
    'Sed in metus pellentesque.',
    'Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.',
    'Maecenas ut nunc fringilla erat varius.',
  ];
  return (
    <div className={`${sectionContainer} mt-20`}>
      <div className="flex justify-between items-center gap-11 w-full">
        <div className="flex flex-col gap-6 flex-1 w-0">
          <h4 className="text-5xl font-semibold text-gray-900">
            We Delivered, You Enjoy Your Order.
          </h4>
          <p className="text-md text-gray-600">
            Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit
            dapibus eu. Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus.
            Curabitur auctor bibendum nunc eget elementum.
          </p>
          <div className="flex flex-col gap-4">
            {pros.map((pro, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 p-1 rounded-full bg-primary/10 flex items-center justify-center">
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
            className="flex gap-4 items-center font-medium w-fit"
          >
            Shop Now
            <ArrowIcon />
          </ButtonLink>
        </div>
        <img
          src="/images/happy_asian_carrying_box_of_food.png"
          alt="Happy Asian Customer"
          className="flex-1 w-0 min-h-150 object-cover"
        />
      </div>
    </div>
  );
};
export default DeliveryCallToActionSection;
