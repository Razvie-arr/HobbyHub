import { AbsoluteCenter, Box, Button, Divider } from '@chakra-ui/react';

interface OrSignUpButtonProps {
  handleClick: () => void;
}

export const OrSignUpButton = ({ handleClick }: OrSignUpButtonProps) => (
  <>
    <Box position="relative" padding="5">
      <Divider />
      <AbsoluteCenter bg="white" px="4">
        Or
      </AbsoluteCenter>
    </Box>
    <Button width="100%" size="lg" variant="outline" colorScheme="purple" mb="2" onClick={handleClick}>
      Sign Up
    </Button>
  </>
);
