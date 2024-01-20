import { Box, Text } from '@chakra-ui/react';

import { DataDetailsTabs } from '../../../../../shared/design-system';
import { WithGroup, WithNullableAuthUser } from '../../../../../shared/types';

import { GroupEvents } from './GroupEvents';
import { SimilarGroups } from './SimilarGroups';

export const GroupDetailsTabs = ({ group, user }: WithGroup & WithNullableAuthUser) => {
  const tabs = [
    {
      title: 'Events',
      content: <GroupEvents group={group} user={user} />,
    },
    {
      title: 'Similar groups',
      content: <SimilarGroups group={group} />,
    },
  ];

  return (
    <DataDetailsTabs
      tabs={
        group.description
          ? [
              {
                title: 'Description',
                content: (
                  <Box p={4} boxShadow="sm" bgColor="white">
                    <Text whiteSpace="pre-line">{group.description}</Text>
                  </Box>
                ),
              },
              ...tabs,
            ]
          : tabs
      }
    />
  );
};

