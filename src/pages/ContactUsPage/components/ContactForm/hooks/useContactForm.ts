import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { contactAPI } from '@/services/supabase/contact/api';
import { useTranslation } from 'react-i18next';
import { useMemo, useEffect } from 'react';
import type { TFunction } from 'i18next';

const getContactSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('validation.nameRequired', 'Name is required')),
    email: z.email(t('validation.emailInvalid', 'Invalid email address')),
    subject: z.string().min(1, t('validation.subjectRequired', 'Subject is required')),
    message: z
      .string()
      .min(10, t('validation.messageMin', 'Message must be at least 10 characters')),
  });

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;

export const useContactForm = () => {
  const { t, i18n } = useTranslation('pages/ContactUsPage');

  const schema = useMemo(() => getContactSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
  });

  // Re-validate fields that have errors when language changes so messages update
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      trigger();
    }
  }, [i18n.language, trigger]);

  const {
    mutate: sendMessage,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const { data, error } = await contactAPI.sendMessage(values);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = handleSubmit(values => sendMessage(values));

  return {
    register,
    errors,
    onSubmit,
    isPending,
    isSuccess,
    isError,
  };
};
