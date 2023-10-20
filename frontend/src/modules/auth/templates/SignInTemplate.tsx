import { AbsoluteCenter, Button, Divider } from '@chakra-ui/react';

import { route } from 'src/route';
import { Box } from 'src/shared/design-system';
import { ReactRouterLink } from 'src/shared/navigation';

import { SignInForm } from '../organisms/SignInForm';

export interface SignInTemplateProps {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string; password: string }) => void;
}

export function SignInTemplate({
  isLoading,
  error,
  onSubmit,
}: SignInTemplateProps) {
  return (
    <>
        <SignInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Box position='relative' padding='5'>
            <Divider />
            <AbsoluteCenter bg='white' px='4'>
                Or
            </AbsoluteCenter>
        </Box>
            <Button
                width='100%'
                size="lg"
                variant='outline'
                colorScheme="purple"
                mb="2"
                to={route.signIn()}
                as={ReactRouterLink}
            >
                Sign Up
            </Button>
        </SignInForm>
    </>
  );
}
