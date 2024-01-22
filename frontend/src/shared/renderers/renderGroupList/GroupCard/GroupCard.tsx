import { HStack, Icon, Stack, Tag, Text } from '@chakra-ui/react';
import { FaUserGroup } from 'react-icons/fa6';

import { AddressInfo, DataCard, EventTypeTag } from 'src/shared/design-system';

import { route } from '../../../../route';
import { getLocationFragmentData, WithGroup } from '../../../types';

interface GroupCardProps extends WithGroup {
  simplified?: boolean;
  maxFlexBasis?: string;
}

export const GroupCard = ({ group, ...other }: GroupCardProps) => (
  <DataCard
    dataRoute={route.groupDetails(group.id)}
    cardTag={
      <Tag
        shadow="base"
        position="absolute"
        top="4"
        left="4"
        zIndex={1}
        size="lg"
        borderRadius="full"
        lineHeight="2.4"
        bg="purple.500"
        color="white"
      >
        <Icon as={FaUserGroup} />
      </Tag>
    }
    imageFilepath={group.image_filepath}
    title={group.name}
    {...other}
  >
    <HStack>
      {group.event_types.map((eventType) => (
        <EventTypeTag key={eventType.id} eventType={eventType} />
      ))}
    </HStack>
    <Text color="purple.600" as="b">
      {`Hosted by: ${`${group.admin.first_name} ${group.admin.last_name}`}`}
    </Text>
    <Stack spacing="2">
      <AddressInfo location={getLocationFragmentData(group.location)} />
    </Stack>
  </DataCard>
);

