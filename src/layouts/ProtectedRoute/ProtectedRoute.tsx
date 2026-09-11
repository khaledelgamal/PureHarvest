import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { routePaths } from '@/router/routePaths';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { sectionContainer, sectionPaddingY } from '@/constants/global.styles';

export default function ProtectedRoute() {
  const user = useAuthStore(s => s.user);
  const isLoading = useAuthStore(s => s.isLoading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className={`flex-center ${sectionContainer} ${sectionPaddingY}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    const redirectTo = encodeURIComponent(location.pathname + location.search + location.hash);
    return <Navigate to={`${routePaths.ACCOUNT.SIGNIN}?redirectTo=${redirectTo}`} replace />;
  }

  return <Outlet />;
}
