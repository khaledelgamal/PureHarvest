import { sectionContainer } from '@/constants/global.styles';
import AppLogo from '../../../AppLogo/AppLogo';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '@/components/Buttons/Button/Button';

const tRoute = 'layouts.AppLayout.components.Footer.components.SubscribeNewsletter';

const SubscribeNewsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscribing with email:', email);
  };

  return (
    <div className={`py-[50px] bg-green-gray-50 border-t border-green-gray-200`}>
      <div className={`${sectionContainer} flex items-center gap-24`}>
        {/* Logo */}
        <AppLogo />

        {/* Title & Description */}
        <div className="flex flex-col gap-1 shrink-0">
          <h3 className="text-green-gray-900 font-medium leading-[38px] tracking-[-3%] text-2xl">
            {t(`${tRoute}.title`, 'Subscribe to our newsletter')}
          </h3>
          <p className="text-green-gray-400 text-sm leading-[150%]">
            {t(`${tRoute}.description`, 'Get the latest updates on new products and offers')}
          </p>
        </div>

        {/* Email Input & Subscribe Button */}
        <div className="flex items-center flex-1 justify-end">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t(`${tRoute}.inputPlaceholder`, 'Your email address')}
            className="
              flex-1
              max-w-[400px]
              pl-6
              pr-20
              py-3
              rounded-full
              border
              border-green-gray-200
              bg-white
              text-green-gray-900
              text-sm
              placeholder:text-green-gray-400
              outline-none
              transition
            "
          />
          <Button size="md" className="-ml-20" onClick={handleSubscribe}>
            {t(`${tRoute}.subscribeButton`, 'Subscribe')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
