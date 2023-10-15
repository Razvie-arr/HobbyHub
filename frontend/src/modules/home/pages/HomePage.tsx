import { useQuery } from '@apollo/client';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';
import { Box, Button } from 'src/shared/design-system';
import { TopNavigation } from 'src/shared/navigation';

const EVENTS = gql(`
  query GetEvents {
    events {
      name
      start_datetime
      end_datetime
      eventTypes {
        name
      }
      author {
        name
      }
      location {
        country
        city
        street_name
        street_number
      }
      summary
      description
      image_filePath
    }
  }
`);

export const HomePage = () => {
  const { user, signOut } = useAuth();
  const queryState = useQuery(EVENTS);

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
        <Box pt="4">GraphQL query result:</Box>
        <Box as="pre" fontFamily="mono">
          {JSON.stringify(queryState.data)}
        </Box>
      </Box>
    </Box>
  );
};

