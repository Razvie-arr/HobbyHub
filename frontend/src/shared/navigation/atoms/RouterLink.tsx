import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import { forwardRef, Link, type LinkProps } from 'src/shared/design-system';

export type RouterLinkProps = Omit<LinkProps, 'as'> & ReactRouterLinkProps;

export const RouterLink = forwardRef(function RouterLink(props: RouterLinkProps, ref) {
  return <Link as={ReactRouterLink} ref={ref} {...props} />;
});

