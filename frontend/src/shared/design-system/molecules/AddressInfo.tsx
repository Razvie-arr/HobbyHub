import { Icon, Stack, Text, TypographyProps } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';

import { Location } from '../../../gql/graphql';

interface AddressInfoProps {
  noIcon?: boolean;
  fontSize?: TypographyProps['fontSize'];
  location: Location;
}

export const AddressInfo = ({ noIcon, fontSize = 'sm', location }: AddressInfoProps) => (
  <Stack direction="row">
    {noIcon ? null : <Icon as={FaLocationDot} color="purple.500" />}
    <Text fontWeight="medium" fontSize={fontSize}>
      {location.city}, {location.street_name} {location.street_number}
    </Text>
  </Stack>
);
