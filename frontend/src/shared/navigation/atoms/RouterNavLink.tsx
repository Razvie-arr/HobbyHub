import { NavLink as ReactRouterNavLink, type NavLinkProps as ReactRouterNavLinkProps } from 'react-router-dom';

import { NavLink, type NavLinkProps } from 'src/shared/design-system';

export type RouterNavLinkProps = Omit<NavLinkProps, 'as'> & ReactRouterNavLinkProps;

export function RouterNavLink(props: RouterNavLinkProps) {
  return <NavLink {...props} as={ReactRouterNavLink} />;
}
