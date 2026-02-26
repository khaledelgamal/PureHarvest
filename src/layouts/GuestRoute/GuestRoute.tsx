import { routePaths } from '@/router/routePaths';
import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function GuestRoute() {
  const user = useAuthStore(store => store.user);

  if (user) {
    return <Navigate to={routePaths.HOME} replace />;
  }

  return <Outlet />;
}
