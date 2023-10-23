import { PropsWithChildren } from 'react';
import { Container } from '@chakra-ui/react';

import { Box, Flex } from 'src/shared/design-system';
import { Footer, TopNavigation } from 'src/shared/navigation';

export const Layout = ({ children }: PropsWithChildren) => (
  <Flex direction="column" minHeight="100vh">
    <TopNavigation />
    <Box p="8" bg="purple.50" flexGrow={1}>
      <Container maxWidth="8xl" mx="auto">
        {children}
      </Container>
    </Box>
    <Footer />
  </Flex>
);

