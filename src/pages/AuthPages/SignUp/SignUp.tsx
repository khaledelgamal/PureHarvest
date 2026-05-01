// pages/Auth/SignUp.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { ServiceError } from '@/services/supabase/types';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import PasswordFieldInput from '@/components/Inputs/PasswordFieldInput/PasswordFieldInput';
import CheckboxInput from '@/components/Inputs/CheckboxInput/CheckboxInput';
import AuthLayout from '../layouts/AuthLayout';
import { routePaths } from '@/router/routePaths';
import { Button } from '@/components/Buttons/Button/Button';
import { authAPI } from '@/services/supabase/auth/api';
import { passwordValidation } from '@/utils/validation/passwordSchema';

// ─── Schema ─────────────────────────────────
const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const tRoute = 'pages.AuthPages.SignUp';

const SignUp = () => {
  const { t } = useTranslation();

  const {
    mutate: signUp,
    isPending,
    error: serverError,
    data: confirmedEmail,
  } = useMutation<string, ServiceError, SignUpFormValues>({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await authAPI.signUp({ email, password });
      if (error) throw error;
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  if (confirmedEmail) {
    return (
      <div className="py-[80px] flex-center">
        <AuthLayout title={t(`${tRoute}.checkEmail`, 'Check Your Email')}>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-gray-600">
              {t(
                `${tRoute}.confirmationSent`,
                "We've sent a confirmation link to {{email}}. Please activate your account then login.",
                { email: confirmedEmail },
              )}
            </p>
            <Link
              to={routePaths.ACCOUNT.SIGNIN}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              {t(`${tRoute}.backToLogin`, 'Back to Login')}
            </Link>
          </div>
        </AuthLayout>
      </div>
    );
  }

  return (
    <div className="py-[80px] flex-center">
      <AuthLayout title={t(`${tRoute}.title`, 'Create Account')}>
        <form onSubmit={handleSubmit(data => signUp(data))} className="flex flex-col gap-4">
          {serverError && (
            <p className="rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {serverError.message}
            </p>
          )}

          <TextFieldInput
            placeholder={t(`${tRoute}.emailPlaceholder`, 'Email')}
            type="email"
            error={errors.email}
            {...register('email')}
          />

          <PasswordFieldInput
            placeholder={t(`${tRoute}.passwordPlaceholder`, 'Password')}
            error={errors.password}
            {...register('password')}
          />

          <PasswordFieldInput
            placeholder={t(`${tRoute}.confirmPasswordPlaceholder`, 'Confirm Password')}
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <CheckboxInput
                aria-label={t(`${tRoute}.acceptTermsAriaLabel`, 'Accept terms and conditions')}
                {...register('acceptTerms')}
              />
              {t(`${tRoute}.acceptTermsLabel`, 'Accept all terms & Conditions')}
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message}</p>
            )}
          </div>

          <Button disabled={isPending} variant="fill" type="submit" size="lg">
            {isPending
              ? t(`${tRoute}.creatingAccount`, 'Creating account...')
              : t(`${tRoute}.createAccount`, 'Create Account')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t(`${tRoute}.alreadyHaveAccount`, 'Already have an account?')}{' '}
          <Link
            to={routePaths.ACCOUNT.SIGNIN}
            className="font-medium text-gray-900 hover:underline"
          >
            {t(`${tRoute}.login`, 'Login')}
          </Link>
        </p>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
