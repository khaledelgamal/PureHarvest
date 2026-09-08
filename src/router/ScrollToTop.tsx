import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state?.preserveScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return children;
};

export default ScrollToTop;
