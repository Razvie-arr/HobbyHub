import { route } from 'src/route';
import { Box } from 'src/shared/design-system';

import { RouterLink } from '../atoms';
import { TopNavigation } from '../organisms';

export function NotFoundPage() {
  return (
    <Box>
      <TopNavigation />
      <Box p="8">
        <Box>
          Page not found, please return to{' '}
          <RouterLink to={route.home()}>Home</RouterLink>.
        </Box>
      </Box>
    </Box>
  );
}
