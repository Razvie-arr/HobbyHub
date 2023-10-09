import { route } from 'src/route';
import { Stack } from 'src/shared/design-system';

import { RouterNavLink } from '../atoms';

export function TopNavigation() {
  return (
    <Stack bg="gray.200" p="4" direction="row" spacing="0">
      <RouterNavLink to={route.home()}>Home</RouterNavLink>
      <RouterNavLink to={route.signIn()}>Sign In</RouterNavLink>
      <RouterNavLink to={route.signUp()}>Sign Up</RouterNavLink>
    </Stack>
  );
}
