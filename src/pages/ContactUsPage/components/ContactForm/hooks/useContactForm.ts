import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { contactAPI } from '@/services/supabase/contact/api';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

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
