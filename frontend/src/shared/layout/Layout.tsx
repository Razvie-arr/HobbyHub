import { PropsWithChildren } from 'react';

import { Box, Flex } from 'src/shared/design-system';
import { Footer, TopNavigation } from 'src/shared/navigation';

export const Layout = ({ children }: PropsWithChildren) => (
  <Flex direction="column" minHeight="100vh">
    <TopNavigation />
    <Box bg="purple.50" flexGrow={1}>
      {children}
    </Box>
    <Footer />
  </Flex>
);

