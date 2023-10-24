import { Alert, AlertIcon, AlertTitle, Card } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

export const NoEvents = () => (
  <Card>
    <Alert status="info" borderRadius="4">
      <AlertIcon />
      <Box>
        <AlertTitle>No events found</AlertTitle>
      </Box>
    </Alert>
  </Card>
);

