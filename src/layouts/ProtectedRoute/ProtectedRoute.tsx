import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { routePaths } from '@/router/routePaths';

export default function ProtectedRoute() {
  const user = useAuthStore(s => s.user);
  const isLoading = useAuthStore(s => s.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(routePaths.ACCOUNT.SIGNIN, { replace: true });
    }
  }, [isLoading, user, navigate]);

  return <Outlet />;
}
