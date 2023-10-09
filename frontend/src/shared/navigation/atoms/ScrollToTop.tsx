import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type ScrollToTopProps = {
  children?: ReactNode;
};

export function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (import.meta.env.NODE_ENV === 'test') {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return children ?? null;
}
