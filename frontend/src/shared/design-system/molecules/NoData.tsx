import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

export const NoData = () => (
  <Alert status="info" mb="8">
    <AlertIcon />
    <Box>
      <AlertTitle>No data found</AlertTitle>
    </Box>
  </Alert>
);

