import { Button, ButtonGroup, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { WithAuthUser, WithEvent } from 'src/shared/types';

import { route } from '../../../../route';
import { ContentContainer } from '../../../../shared/layout';
import { useAuth } from '../../../auth';
import { DeleteEventButton } from '../shared';

const EventDetailsHeaderButtons = ({ user, event }: WithAuthUser & WithEvent) => (
  <ButtonGroup spacing="6">
    <Stack direction={{ base: 'column', sm: 'row' }}>
      {user.id === event.author?.id || user.id === event.group?.admin.id ? (
        <>
          <Button as={Link} to={route.editEvent(event.id)} colorScheme="purple" rounded="full">
            Edit
          </Button>
          <DeleteEventButton event={event} colorScheme="purple" rounded="full" variant="outline" />
        </>
      ) : (
        <>
          <Button colorScheme="purple" rounded="full">
            Join Event
          </Button>
          <Button colorScheme="purple" rounded="full" variant="outline" bgColor="white">
            Message
          </Button>
        </>
      )}
    </Stack>
  </ButtonGroup>
);

export const EventDetailsHeader = ({ event }: WithEvent) => {
  const { user } = useAuth();
  return (
    <Flex
      width="100%"
      bgColor="white"
      shadow="sm"
      position="sticky"
      top={{ base: '57px', md: '67px' }}
      zIndex={1}
      py={4}
    >
      <ContentContainer>
        <HStack justifyContent="space-between" bgColor="white" flexBasis="100%">
          <Heading as="h1" size="lg">
            {event.name}
          </Heading>
          {user ? <EventDetailsHeaderButtons user={user} event={event} /> : null}
        </HStack>
      </ContentContainer>
    </Flex>
  );
};

