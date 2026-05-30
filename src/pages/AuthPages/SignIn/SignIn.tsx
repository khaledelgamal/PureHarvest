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

const tRoute = 'pages.AuthPages.SignIn';

const SignIn = () => {
  const { t } = useTranslation();
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
      <AuthLayout title={t(`${tRoute}.title`, 'Sign In')}>
        <form onSubmit={handleSubmit(data => signIn(data))} className="flex flex-col gap-4">
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
            })}
          />

          <Button disabled={isPending} variant="fill" type="submit" size="lg" className="mt-2">
            {isPending ? t(`${tRoute}.loggingIn`, 'Logging in...') : t(`${tRoute}.login`, 'Login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t(`${tRoute}.noAccount`, "Don't have account?")}{' '}
          <Link
            to={routePaths.ACCOUNT.SIGNUP}
            className="font-medium text-gray-900 hover:underline"
          >
            {t(`${tRoute}.register`, 'Register')}
          </Link>
        </p>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
