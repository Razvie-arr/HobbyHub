import { route } from 'src/route';
import { Box } from 'src/shared/design-system';

import { RouterLink } from '../atoms';

export function NotFoundPage() {
  return (
    <Box>
      Page not found, please return to <RouterLink to={route.home()}>Home</RouterLink>.
    </Box>
  );
}
