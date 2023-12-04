import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Center, Heading, Stack, TabPanel } from '@chakra-ui/react';

import { NoData } from 'src/shared/design-system';
import { QueryResult } from 'src/shared/layout';

import { createShowMoreHandler } from '../../../../utils/dataFetch';
import { USER_RECEIVED_REVIEWS } from '../../queries';
import { WithUserProfile } from '../../types';
import { ProfileReview } from '../ProfileDetailsRatings';

export const ReviewsTabPanel = ({ userProfile }: WithUserProfile) => {
  const [noMoreResults, setNoMoreResults] = useState(false);

  const queryResult = useQuery(USER_RECEIVED_REVIEWS, {
    variables: {
      userId: userProfile.id,
      offset: 0,
      limit: 4,
    },
  });

  return (
    <TabPanel px="0">
      <Heading fontSize="lg" p="2">
        Reviews by users
      </Heading>
      <QueryResult
        queryName="reviewsByUserId"
        queryResult={queryResult}
        render={(reviews) => (
          <Stack spacing="4">
            {reviews.map((review) => (
              <ProfileReview key={review.id} {...review} />
            ))}
            <Center mb="16">
              <Button
                colorScheme="purple"
                isDisabled={noMoreResults}
                onClick={createShowMoreHandler({
                  queryResult,
                  queryName: 'reviewsByUserId',
                  offset: reviews.length,
                  onNoMoreResults: () => {
                    setNoMoreResults(true);
                  },
                })}
              >
                {noMoreResults ? 'No more results' : 'Show more'}
              </Button>
            </Center>
          </Stack>
        )}
        renderOnNoData={<NoData description="This user has no created events." />}
      />
    </TabPanel>
  );
};

