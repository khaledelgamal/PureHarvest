import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';

export default function ProtectedRoute() {
  const user = useAuthStore(store => store.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={routePaths.ACCOUNT.SIGNIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
