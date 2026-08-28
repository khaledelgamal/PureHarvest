import { sectionContainer } from '@/constants/global.styles';
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
    <div className={`py-[50px] bg-green-gray-50 border-t border-green-gray-200 relative`}>
      <CloseButton className="absolute top-4 right-4" onClick={handleClose} />
      <div className={`${sectionContainer} flex items-center gap-24`}>
        {/* Logo */}
        <AppLogo />

        {/* Title & Description */}
        <div className="flex flex-col gap-1 shrink-0">
          <h3 className="text-green-gray-900 font-medium leading-[38px] tracking-[-3%] text-2xl">
            {t('newsletterTitle', 'Subscribe to our newsletter')}
          </h3>
          <p className="text-green-gray-400 text-sm leading-[150%]">
            {t('newsletterDescription', 'Get the latest updates on new products and offers')}
          </p>
        </div>

        {/* Email Input & Subscribe Button */}
        <form onSubmit={handleSubscribe} className="flex items-center flex-1 justify-end">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('newsletterPlaceholder', 'Your email address')}
            required
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
              disabled:opacity-70
            "
          />
          <Button
            size="md"
            className="-ml-20 flex-center gap-1 w-40"
            type="submit"
            disabled={isPending}
          >
            {t('subscribeButton', 'Subscribe')}
            {isPending && <LoadingSpinner color="#FFF" radiusInPx={15} borderWidth={2} />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
