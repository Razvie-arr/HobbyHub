import { Box, Center, Spinner } from '@chakra-ui/react';

import { useTokenVerification } from '../hooks';

export const VerifyUserPage = () => {
  const { isVerified, verifyUserState } = useTokenVerification();

  return (
    <Box>
      <Center>
        {verifyUserState.loading ? (
          <>
            <Spinner /> Verifying user...
          </>
        ) : isVerified ? (
          'User successfully verified'
        ) : (
          'User is not verified.'
        )}
      </Center>
    </Box>
  );
};

