import { Box, Text } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { MdAccountCircle, MdInfo, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { route } from '../../../../route';
import {
  AddressInfo,
  Button,
  DataDetailsContainer,
  DataDetailsContent,
  DataDetailsHeader,
  EventTypeTag,
  NoData,
} from '../../../../shared/design-system';
import { renderEventList } from '../../../../shared/renderers';
import { getLocationFragmentData, WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';
import { SendMessageModal } from '../../../messages';

import { SimilarGroups } from './SimilarGroups';

export const GroupDetails = ({ group }: WithGroup) => {
  const { user } = useAuth();

  const owner = group.admin;

  const isUserOwner = user && user.id === owner.id;

  return (
    <DataDetailsContainer>
      <DataDetailsHeader
        title={group.name}
        actionButtons={
          isUserOwner ? (
            <>
              <Button as={Link} to={route.editGroup(group.id)} colorScheme="purple" rounded="full">
                Edit
              </Button>
              {/* <DeleteEventButton event={event} borderRadius="full" colorScheme="purple" variant="outline" /> */}
            </>
          ) : user ? (
            <SendMessageModal user={user} recipient={owner} />
          ) : null
        }
      />
      <DataDetailsContent
        imageFilepath={group.image_filepath}
        sideCardProps={{
          title: 'Summary',
          description: group.summary,
          mapData: group,
          items: [
            {
              icon: MdAccountCircle,
              content: (
                <Text>
                  Admin: <Text as="b">{`${owner.first_name} ${owner.last_name}`}</Text>
                </Text>
              ),
            },
            {
              icon: MdInfo,
              content: group.event_types.map((eventType) => <EventTypeTag key={eventType.id} eventType={eventType} />),
            },
            {
              icon: MdLocationOn,
              content: <AddressInfo noIcon fontSize="md" location={getLocationFragmentData(group.location)} />,
            },
          ],
        }}
        tabsProps={[
          {
            title: 'Description',
            content: (
              <Box p={4} boxShadow="sm" bgColor="white">
                <Text whiteSpace="pre-line">{group.description}</Text>
              </Box>
            ),
          },
          {
            title: 'Events',
            content: pipe(
              Option.fromNullable(group.events),
              Option.filter(ReadonlyArray.isNonEmptyArray),
              Option.match({
                onNone: () => (
                  <NoData title="No events" description={`${group.name} has not organized any events yet`} />
                ),
                onSome: renderEventList({ user, maxColumnCount: 3 }),
              }),
            ),
          },
          {
            title: 'Similar groups',
            content: <SimilarGroups group={group} />,
          },
        ]}
      />
    </DataDetailsContainer>
  );
};

