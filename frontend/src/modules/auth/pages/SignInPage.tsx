import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';
import { Box, Button } from 'src/shared/design-system';

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
    <>
      <Button
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
        Sign In
      </Button>
      {signInRequestState.error ? <Box color="red">{signInRequestState.error.message}</Box> : null}
    </>
  );
}

