import { Button, ButtonGroup, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { match } from 'ts-pattern';

import { useDisclosure } from 'src/shared/design-system';
import { WithAuthUser } from 'src/shared/types';

import { SendMessageModal } from '../../../../modules/messages/components/SendMessageModal';
import { ContentContainer } from '../../../layout';

import { DataDetailsProps, WithDeleteButton } from './types';

const DataDetailsHeaderButtons = ({
  user,
  editRoute,
  deleteButton,
  ...other
}: DataDetailsProps & WithAuthUser & WithDeleteButton) => {
  const owner = match(other)
    .with({ type: 'event' }, ({ data }) =>
      match(data.author)
        .with({ __typename: 'User' }, (userObj) => userObj)
        .with({ __typename: 'Group' }, ({ admin }) => admin)
        .exhaustive(),
    )
    .with({ type: 'group' }, ({ data }) => data.admin)
    .exhaustive();

  const isUserInfoOwner = user.id === owner.id;

  const sendMessageModalDisclosure = useDisclosure();
  return (
    <>
      <ButtonGroup spacing="6">
        <Stack direction={{ base: 'column', sm: 'row' }}>
          {isUserInfoOwner ? (
            <>
              <Button as={Link} to={editRoute} colorScheme="purple" rounded="full">
                Edit
              </Button>
              {deleteButton}
            </>
          ) : (
            <>
              <Button colorScheme="purple" rounded="full">
                {match(other)
                  .with({ type: 'event' }, () => 'Join event')
                  .with({ type: 'group' }, () => 'Join group')
                  .exhaustive()}
              </Button>
              <SendMessageModal user={user} recipient={owner} disclosure={sendMessageModalDisclosure} />
            </>
          )}
        </Stack>
      </ButtonGroup>
    </>
  );
};

export const DataDetailsHeader = ({ user, ...other }: DataDetailsProps & WithDeleteButton) => (
  <Flex width="100%" bgColor="white" shadow="sm" position="sticky" top={{ base: '57px', md: '59px' }} zIndex={1} py={4}>
    <ContentContainer>
      <HStack justifyContent="space-between" bgColor="white" flexBasis="100%">
        <Heading as="h1" size="lg">
          {other.data.name}
        </Heading>
        {user ? <DataDetailsHeaderButtons user={user} {...other} /> : null}
      </HStack>
    </ContentContainer>
  </Flex>
);

