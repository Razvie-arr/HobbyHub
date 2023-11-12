import { Flex, useDisclosure } from '@chakra-ui/react';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthModalButtons = () => {
  const signInModalDisclosure = useDisclosure();
  const signUpModalDisclosure = useDisclosure();
  return (
    <Flex gap="2">
      <SignInForm disclosure={signInModalDisclosure} signUpModalDisclosure={signUpModalDisclosure} />
      <SignUpForm disclosure={signUpModalDisclosure} />
    </Flex>
  );
};
