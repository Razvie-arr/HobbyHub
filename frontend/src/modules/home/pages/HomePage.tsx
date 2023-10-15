import { useAuth } from 'src/modules/auth';
import { Box, Button } from 'src/shared/design-system';
import { TopNavigation } from 'src/shared/navigation';

export const HomePage = () => {
  const { user, signOut } = useAuth();

  return (
    <Box>
      <TopNavigation />
      <Box p="8">
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
      </Box>
    </Box>
  );
};

