import { Icon, Stack, Text } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';

import { EventProps } from '../../types';

interface EventAddressProps {
  location: EventProps['location'];
}

export const EventAddress = ({ location }: EventAddressProps) => (
  <Stack direction="row">
    <Icon as={FaLocationDot} color="purple.500" />
    <Text fontWeight="medium" fontSize="sm">
      {location.city}, {location.street_name} {location.street_number}
    </Text>
  </Stack>
);

