import { Image, Stack, VStack } from '@chakra-ui/react';

import { DEFAULT_EVENT_IMAGE_PATH } from '../../../../shared/constants';
import { ContentContainer } from '../../../../shared/layout';
import { WithEvent } from '../../../../shared/types';

import { EventDetailsHeader } from './EventDetailsHeader';
import { EventDetailsInfoCard } from './EventDetailsInfoCard';
import { EventDetailsTabs } from './EventDetailsTabs';

export const EventDetails = ({ event }: WithEvent) => (
  <Stack spacing="8">
    <EventDetailsHeader event={event} />
    <ContentContainer>
      <Stack spacing={4} justifyContent="space-between" direction={{ base: 'column-reverse', md: 'row' }}>
        <VStack flexBasis="65%">
          <Image
            w="100%"
            aspectRatio="16/9"
            objectFit="cover"
            alt="Event Image"
            src={event.image_filepath ?? DEFAULT_EVENT_IMAGE_PATH}
          />
          <EventDetailsTabs event={event} />
        </VStack>
        <EventDetailsInfoCard event={event} />
      </Stack>
    </ContentContainer>
  </Stack>
);

