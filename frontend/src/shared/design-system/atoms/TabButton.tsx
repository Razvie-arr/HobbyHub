import { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

export interface TabButtonProps {
  handleClick: () => void;
  active: boolean;
  label: ReactNode;
}

export const TabButton = ({ handleClick, active, label }: TabButtonProps) => (
  <Button borderRadius="full" colorScheme="purple" variant={active ? 'solid' : 'ghost'} onClick={handleClick}>
    {label}
  </Button>
);

