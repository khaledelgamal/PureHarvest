import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/services/supabase/client';
import { routePaths } from '@/router/routePaths';
import AuthLayout from '../layouts/AuthLayout';
import AppLogo from '@/layouts/AppLayout/components/AppLogo/AppLogo';

type CallbackState = 'loading' | 'success' | 'error';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<CallbackState>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlError = params.get('error');
        const errorDescription = params.get('error_description');

        if (urlError) {
          setState('error');
          setError(errorDescription || urlError);
          setTimeout(() => navigate(routePaths.ACCOUNT.SIGNIN), 3000);
          return;
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setState('error');
          setError(sessionError.message);
          setTimeout(() => navigate(routePaths.ACCOUNT.SIGNIN), 3000);
          return;
        }

        if (session) {
          setState('success');
          setTimeout(() => navigate(routePaths.ACCOUNT.DASHBOARD.path), 1500);
        } else {
          setState('error');
          setError('No session found');
          setTimeout(() => navigate(routePaths.ACCOUNT.SIGNIN), 3000);
        }
      } catch (err: unknown) {
        setState('error');
        setError((err as Error).message || 'An unexpected error occurred');
        setTimeout(() => navigate(routePaths.ACCOUNT.SIGNIN), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="py-[80px] flex-center">
      <AuthLayout title="Auth verification">
        {/* Loading State */}
        {state === 'loading' && (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-3 bg-primary/10 rounded-full animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Verifying Your Email</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Please wait while we confirm your account...
            </p>
          </div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-primary to-primary-soft rounded-full flex-center">
              <svg
                className="w-10 h-10 text-white animate-[scale-in_0.3s_ease-out]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <span>Welcome to</span> <AppLogo />
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your account has been verified. Taking you to your dashboard...
            </p>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-danger/10 rounded-full flex-center">
              <svg
                className="w-10 h-10 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Verification Failed</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {error || "We couldn't verify your email. Please try again."}
            </p>
            <p className="text-gray-400 text-xs">Redirecting to sign in...</p>
          </div>
        )}
      </AuthLayout>
    </div>
  );
};

export default AuthCallback;
