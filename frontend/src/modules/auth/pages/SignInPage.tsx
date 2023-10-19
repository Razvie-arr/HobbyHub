import { useMutation } from '@apollo/client';
import { FormControl, FormLabel, Heading, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';
import { Box, Button, Flex, Input, Stack } from 'src/shared/design-system';
import { Layout } from 'src/shared/layout';

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

export function SignInPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  return (
    <Layout>
      <Flex
        minH='100vh'
        align='center'
        justify='center'
        bg='purple.50'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
            <Heading fontSize='4xl'>Sign in to your account</Heading>
          <Box
            rounded='lg'
            bg='white'
            boxShadow='lg'
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                  <Link color='purple.500'>Forgot password?</Link>
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    void signInRequest({
                      variables: {
                        email: 'a@a.com',
                        password: 'pass',
                      },
                    });
                  }}
                  isLoading={signInRequestState.loading}
                  >
                  Sign in
                </Button>
                {signInRequestState.error ? <Box color="red">{signInRequestState.error.message}</Box> : null}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
