import { Navigate, Outlet } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import useAuthStore from '@/store/useAuthStore';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { sectionContainer, sectionPaddingY } from '@/constants/global.styles';

export default function GuestRoute() {
  const user = useAuthStore(store => store.user);
  const isLoading = useAuthStore(store => store.isLoading);
  if (isLoading) {
    return (
      <div className={`flex-center ${sectionContainer} ${sectionPaddingY}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to={routePaths.ACCOUNT.DASHBOARD.path} replace />;
  }

  return <Outlet />;
}
