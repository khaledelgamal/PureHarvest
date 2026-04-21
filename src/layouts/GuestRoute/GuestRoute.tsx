import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import useAuthStore from '@/store/useAuthStore';

export default function GuestRoute() {
  const user = useAuthStore(store => store.user);
  const isLoading = useAuthStore(store => store.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate(routePaths.ACCOUNT.DASHBOARD.path, { replace: true });
    }
  }, [isLoading, user, navigate]);

  return <Outlet />;
}
