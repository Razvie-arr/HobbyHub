import { PropsWithChildren } from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface DataRowItemProps extends PropsWithChildren {
  icon?: IconType;
}

export const DataRowItem = ({ icon, children }: DataRowItemProps) => (
  <HStack spacing={4}>
    {icon ? <Icon as={icon} boxSize={6} color="purple.500" /> : null}
    {children}
  </HStack>
);
