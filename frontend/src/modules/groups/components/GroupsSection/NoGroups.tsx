import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

export const NoGroups = () => (
  <Alert status="info" mb="8">
    <AlertIcon />
    <Box>
      <AlertTitle>No groups found</AlertTitle>
    </Box>
  </Alert>
);
