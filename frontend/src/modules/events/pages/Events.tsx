import { Stack } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { EventsMapButton, EventsSection } from '../components';

export const Events = () => (
  <>
    <EventsMapButton events={[]} position="fixed" bottom="8" right="8" />
    <Box maxWidth={{ xl: '1470px' }} mx="auto">
      <Stack spacing="8">
        <EventsSection title="Today around you" />
        <EventsSection title="You might be interested" />
        <EventsSection title="Newly added around you" />
      </Stack>
    </Box>
  </>
);

