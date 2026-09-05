import { useLocation, useSearchParams } from 'react-router-dom';
import { useLayoutEffect, type ReactNode } from 'react';

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);
  return children;
};
export default ScrollToTop;
