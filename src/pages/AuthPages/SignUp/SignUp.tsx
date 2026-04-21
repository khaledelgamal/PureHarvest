// pages/Auth/SignUp.tsx
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import type { ServiceError } from '@/services/supabase/types';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import PasswordFieldInput from '@/components/Inputs/PasswordFieldInput/PasswordFieldInput';
import CheckboxInput from '@/components/Inputs/CheckboxInput/CheckboxInput';
import AuthLayout from '../layouts/AuthLayout';
import { routePaths } from '@/router/routePaths';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { authAPI } from '@/services/supabase/auth/api';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

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
    getValues,
    formState: { errors },
  } = useForm<SignUpFormValues>({
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
            {...register('email', {
              required: t(`${tRoute}.emailRequired`, 'Email is required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t(`${tRoute}.emailInvalid`, 'Invalid email address'),
              },
            })}
          />

          <PasswordFieldInput
            placeholder={t(`${tRoute}.passwordPlaceholder`, 'Password')}
            error={errors.password}
            {...register('password', {
              required: t(`${tRoute}.passwordRequired`, 'Password is required'),
              minLength: {
                value: 6,
                message: t(`${tRoute}.passwordMinLength`, 'Password must be at least 6 characters'),
              },
            })}
          />

          <PasswordFieldInput
            placeholder={t(`${tRoute}.confirmPasswordPlaceholder`, 'Confirm Password')}
            error={errors.confirmPassword}
            {...register('confirmPassword', {
              required: t(`${tRoute}.confirmPasswordRequired`, 'Please confirm your password'),
              validate: value =>
                value === getValues('password') ||
                t(`${tRoute}.passwordsMismatch`, 'Passwords do not match'),
            })}
          />

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <CheckboxInput
                aria-label={t(`${tRoute}.acceptTermsAriaLabel`, 'Accept terms and conditions')}
                {...register('acceptTerms', {
                  required: t(`${tRoute}.acceptTermsRequired`, 'You must accept the terms'),
                })}
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
