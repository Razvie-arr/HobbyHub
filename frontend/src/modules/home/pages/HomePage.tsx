import { useAuth } from 'src/modules/auth';
import { Box, Button } from 'src/shared/design-system';

export const HomePage = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <Box>
        Hello:{' '}
        {user ? (
          <>
            {user.name} <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          'Anonymous'
        )}
      </Box>
      <Box pt="4">Hello world!</Box>
    </>
  );
};

