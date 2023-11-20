import { Button, ButtonGroup, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { match } from 'ts-pattern';

import { EventStatusTag, useDisclosure } from 'src/shared/design-system';
import { WithNullableAuthUser } from 'src/shared/types';

import { SendMessageModal } from '../../../../modules/messages/components/SendMessageModal';
import { getCurrentDateTime } from '../../../../utils/form';
import { ContentContainer } from '../../../layout';

import { DataDetailsProps, WithDeleteButton } from './types';

const DataDetailsHeaderButtons = ({
  user,
  editRoute,
  deleteButton,
  ...other
}: DataDetailsProps & WithNullableAuthUser & WithDeleteButton) => {
  const owner = match(other)
    .with({ type: 'event' }, ({ data }) =>
      match(data.author)
        .with({ __typename: 'User' }, (userObj) => userObj)
        .with({ __typename: 'Group' }, ({ admin }) => admin)
        .exhaustive(),
    )
    .with({ type: 'group' }, ({ data }) => data.admin)
    .exhaustive();

  const isUserInfoOwner = user && user.id === owner.id;

  const sendMessageModalDisclosure = useDisclosure();
  return (
    <>
      <ButtonGroup spacing="6">
        <Stack direction="row">
          {isUserInfoOwner ? (
            <>
              <Button as={Link} to={editRoute} colorScheme="purple" rounded="full">
                Edit
              </Button>
              {deleteButton}
            </>
          ) : (
            <>
              {other.type === 'event' ? (
                <Button
                  colorScheme="purple"
                  rounded="full"
                  isDisabled={other.data.start_datetime.slice(0, 23) < getCurrentDateTime()}
                  size={{ base: 'sm', md: 'md' }}
                >
                  Join event
                </Button>
              ) : null}
              {user ? <SendMessageModal user={user} recipient={owner} disclosure={sendMessageModalDisclosure} /> : null}
            </>
          )}
        </Stack>
      </ButtonGroup>
    </>
  );
};

export const DataDetailsHeader = ({ user, ...other }: DataDetailsProps & WithDeleteButton) => (
  <Flex width="100%" bgColor="white" shadow="sm" position="sticky" top={{ base: '49px', md: '59px' }} zIndex={1} py={4}>
    <ContentContainer>
      <Stack justifyContent="space-between" bgColor="white" flexBasis="100%" direction={{ base: 'column', md: 'row' }}>
        <HStack>
          {other.type === 'event' ? (
            <EventStatusTag
              hasExpired={other.type === 'event' && other.data.start_datetime.slice(0, 23) < getCurrentDateTime()}
              hasWaitlist={other.data.allow_waitlist}
              isFullCapacity={other.data.participants.length === other.data.capacity}
            />
          ) : null}
          <Heading as="h1" size="lg">
            {other.data.name}
          </Heading>
        </HStack>
        <DataDetailsHeaderButtons user={user} {...other} />
      </Stack>
    </ContentContainer>
  </Flex>
);

