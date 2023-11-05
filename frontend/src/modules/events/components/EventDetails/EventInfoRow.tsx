import { PropsWithChildren } from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface EventInfoRowProps extends PropsWithChildren {
  icon?: IconType;
}

export const EventInfoRow = ({ icon, children }: EventInfoRowProps) => (
  <HStack spacing={4}>
    {icon ? <Icon as={icon} boxSize={6} color="purple.500" /> : null}
    {children}
  </HStack>
);

