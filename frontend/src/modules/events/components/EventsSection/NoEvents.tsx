import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

export const NoEvents = () => (
  <Alert status="info">
    <AlertIcon />
    <Box>
      <AlertTitle>No events found</AlertTitle>
    </Box>
  </Alert>
);

