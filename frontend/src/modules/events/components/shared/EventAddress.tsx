import { Icon, Stack, Text, TypographyProps } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';

import { EventProps } from '../../types';

interface EventAddressProps {
  noIcon?: boolean;
  fontSize?: TypographyProps['fontSize'];
  location: EventProps['location'];
}

export const EventAddress = ({ noIcon, fontSize = 'sm', location }: EventAddressProps) => (
  <Stack direction="row">
    {noIcon ? null : <Icon as={FaLocationDot} color="purple.500" />}
    <Text fontWeight="medium" fontSize={fontSize}>
      {location.city}, {location.street_name} {location.street_number}
    </Text>
  </Stack>
);
