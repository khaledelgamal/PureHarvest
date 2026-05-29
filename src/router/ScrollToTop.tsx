import { useLocation } from 'react-router-dom';
import { useLayoutEffect, type ReactNode } from 'react';

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};
export default ScrollToTop;
