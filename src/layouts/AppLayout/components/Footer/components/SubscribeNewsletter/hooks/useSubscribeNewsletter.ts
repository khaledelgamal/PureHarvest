import { useMutation } from '@tanstack/react-query';
import { newsletterAPI } from '@/services/supabase/newsletter';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useSubscribeNewsletter = () => {
  const { t } = useTranslation('layouts/AppLayout');

  return useMutation({
    mutationFn: (email: string) => newsletterAPI.addToNewsletter(email),
    onSuccess: response => {
      if (response.error) {
        // Handle specific unique constraint error from Supabase
        if (
          response.error.message?.includes('duplicate key value violates unique constraint') ||
          response.error.message?.includes('newsletter_subscribers_email_key')
        ) {
          toast.error(t('subscribeAlready', 'You are already subscribed to the newsletter.'));
        } else {
          toast.error(
            response.error.message || t('subscribeError', 'Failed to subscribe. Please try again.'),
          );
        }
        return;
      }
      toast.success(t('subscribeSuccess', 'Successfully subscribed to the newsletter!'));
    },
    onError: () => {
      toast.error(t('subscribeError', 'Failed to subscribe. Please try again.'));
    },
  });
};
