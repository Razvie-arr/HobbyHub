import { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

export interface SubmitButtonProps {
  isLoading: boolean;
  text: ReactNode;
}

export const SubmitButton = ({ isLoading, text }: SubmitButtonProps) => (
  <Button width="100%" size="lg" type="submit" isLoading={isLoading} colorScheme="purple" mt="6">
    {text}
  </Button>
);
