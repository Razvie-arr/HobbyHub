import { Button, ButtonGroup, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { match } from 'ts-pattern';

import { WithAuthUser } from 'src/shared/types';

import { ContentContainer } from '../../../layout';

import { DataDetailsProps } from './types';

const DataDetailsHeaderButtons = ({ user, editRoute, ...other }: DataDetailsProps & WithAuthUser) => {
  const isUserInfoOwner =
    user.id ===
    match(other)
      .with({ type: 'event' }, ({ data }) => (data.author ? data.author.id : data.group?.admin.id))
      .with({ type: 'group' }, ({ data }) => data.admin.id)
      .exhaustive();
  return (
    <ButtonGroup spacing="6">
      <Stack direction={{ base: 'column', sm: 'row' }}>
        {isUserInfoOwner ? (
          <>
            <Button as={Link} to={editRoute} colorScheme="purple" rounded="full">
              Edit
            </Button>
            {/* <DeleteEventButton event={event} colorScheme="purple" rounded="full" variant="outline" /> */}
          </>
        ) : (
          <>
            <Button colorScheme="purple" rounded="full">
              {match(other)
                .with({ type: 'event' }, () => 'Join event')
                .with({ type: 'group' }, () => 'Join group')
                .exhaustive()}
            </Button>
            <Button colorScheme="purple" rounded="full" variant="outline" bgColor="white">
              Message
            </Button>
          </>
        )}
      </Stack>
    </ButtonGroup>
  );
};

export const DataDetailsHeader = ({ user, ...other }: DataDetailsProps) => (
  <Flex width="100%" bgColor="white" shadow="sm" position="sticky" top={{ base: '57px', md: '67px' }} zIndex={1} py={4}>
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

