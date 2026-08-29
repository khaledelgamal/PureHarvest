import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import type { ServiceError } from '@/services/supabase/types';
import TextFieldInput from '@/components/Inputs/TextFieldInput/TextFieldInput';
import PasswordFieldInput from '@/components/Inputs/PasswordFieldInput/PasswordFieldInput';
import AuthLayout from '../layouts/AuthLayout';
import { routePaths } from '@/router/routePaths';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/Buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { authAPI } from '@/services/supabase/auth/api';
import type { AuthSession } from '@/services/supabase/auth/types';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const { t } = useTranslation('pages/AuthPages');
  const navigate = useNavigate();
  const location = useLocation();

  const {
    mutate: signIn,
    isPending,
    error: serverError,
  } = useMutation<AuthSession, ServiceError, SignInFormValues>({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await authAPI.signIn({ email, password });
      if (error) throw error;
      return data as AuthSession;
    },
    onSuccess: () => {
      const state = location.state as { from?: string };
      navigate(state?.from || routePaths.ACCOUNT.DASHBOARD.path);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="py-[80px] flex-center">
      <AuthLayout title={t('signInTitle', 'Sign In')}>
        <form onSubmit={handleSubmit(data => signIn(data))} className="flex flex-col gap-4">
          {serverError && (
            <p className="rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
              {serverError.message}
            </p>
          )}

          <TextFieldInput
            placeholder={t('emailPlaceholder', 'Email')}
            type="email"
            error={errors.email}
            {...register('email', {
              required: t('emailRequired', 'Email is required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('emailInvalid', 'Invalid email address'),
              },
            })}
          />

          <PasswordFieldInput
            placeholder={t('passwordPlaceholder', 'Password')}
            error={errors.password}
            {...register('password', {
              required: t('passwordRequired', 'Password is required'),
            })}
          />

          <Button disabled={isPending} variant="fill" type="submit" size="lg" className="mt-2">
            {isPending ? t('loggingIn', 'Logging in...') : t('login', 'Login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t('noAccount', "Don't have account?")}{' '}
          <Link
            to={routePaths.ACCOUNT.SIGNUP}
            className="font-medium text-gray-900 hover:underline"
          >
            {t('register', 'Register')}
          </Link>
        </p>

        <div className="mt-8 p-4 bg-green-gray-50 rounded-lg border border-green-gray-100 text-sm text-green-gray-700">
          <p className="font-medium mb-2 text-green-gray-900">
            {t('testCredentialsTitle', 'Demo Credentials')}
          </p>
          <div className="font-mono text-xs bg-white p-2 rounded border border-green-gray-100 mb-3">
            <p>Email: test@pureharvest.com</p>
            <p className="mt-1">Password: Test123#</p>
          </div>
          <p className="text-xs leading-relaxed text-green-gray-500">
            *{' '}
            {t(
              'testCredentialsHint',
              'Hint: Some behaviors like editing account name, password, and address are not accessible for this demo account.',
            )}
          </p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
