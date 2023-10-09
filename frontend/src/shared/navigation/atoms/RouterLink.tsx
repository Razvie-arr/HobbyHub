import { Link as ReactRouterLink } from 'react-router-dom';

import { forwardRef, Link, type LinkProps } from 'src/shared/design-system';

export type RouterLinkProps = Omit<LinkProps, 'as'>;

export const RouterLink = forwardRef(function RouterLink(
  props: RouterLinkProps,
  ref,
) {
  return <Link as={ReactRouterLink} ref={ref} {...props} />;
});
