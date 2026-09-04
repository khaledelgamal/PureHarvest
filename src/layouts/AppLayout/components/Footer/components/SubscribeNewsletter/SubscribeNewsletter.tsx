import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import AppLogo from '../../../AppLogo/AppLogo';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '@/components/Buttons/Button/Button';
import { useSubscribeNewsletter } from './hooks/useSubscribeNewsletter';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';
import { localStorageKeys, localStorageValues } from '@/constants/localStorageKeys';

const SubscribeNewsletter = () => {
  const { t } = useTranslation('layouts/AppLayout');
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useSubscribeNewsletter();
  const [isClosed, setIsClosed] = useState(
    () =>
      localStorage.getItem(localStorageKeys.newsletter) === localStorageValues.newsletter.closed,
  );

  const handleClose = () => {
    localStorage.setItem(localStorageKeys.newsletter, 'closed');
    setIsClosed(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate(email);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div
      className={`${sectionPaddingX} py-10 md:py-[50px] bg-green-gray-50 border-t border-green-gray-200 relative`}
    >
      <CloseButton className="absolute top-1 right-1" onClick={handleClose} />
      <div
        className={`${sectionContainer} flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 xl:gap-24 text-center xl:text-left`}
      >
        {/* Logo */}
        <div className="shrink-0">
          <AppLogo />
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-1 shrink-0">
          <h3 className="text-green-gray-900 font-medium leading-tight md:leading-[38px] tracking-[-3%] text-xl md:text-2xl">
            {t('newsletterTitle', 'Subscribe to our newsletter')}
          </h3>
          <p className="text-green-gray-400 text-sm leading-[150%]">
            {t('newsletterDescription', 'Get the latest updates on new products and offers')}
          </p>
        </div>

        {/* Email Input & Subscribe Button */}
        <form
          onSubmit={handleSubscribe}
          className="relative flex items-center w-full max-w-md xl:max-w-[400px] xl:ml-auto"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('newsletterPlaceholder', 'Your email address')}
            required
            className="
              w-full
              pl-6
              pr-[140px]
              py-3.5
              md:py-3
              rounded-full
              border
              border-green-gray-200
              bg-white
              text-green-gray-900
              text-sm
              placeholder:text-green-gray-400
              outline-none
              transition
              disabled:opacity-70
            "
          />
          <div className={` absolute right-1 md:right-1.5 `}>
            <Button
              size="md"
              className="flex items-center justify-center gap-1 max-w-[120px] py-2 md:py-2"
              type="submit"
              disabled={isPending}
            >
              {t('subscribeButton', 'Subscribe')}
              {isPending && <LoadingSpinner color="#FFF" radiusInPx={15} borderWidth={2} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
