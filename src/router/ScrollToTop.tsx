import { useLayoutEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const EXCLUDED_PATHS = ['/account/dashboard', '/account/order-history', '/account/settings'];

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
