import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import { QueryResult } from '../../shared/layout';
import { getEventFragmentData, WithAuthUser } from '../../shared/types';
import { useAuth } from '../auth';

import { ReviewEventParticipants } from './components';
import { EVENT } from './queries';

export const AddReviewPageContainer = () => {
  const { user } = useAuth();

  let [param] = useSearchParams();
  const eventId = param.get('eventId');

  return user && eventId ? <AddReviewPage user={user} eventId={parseInt(eventId)} /> : null;
};

interface AddReviewPageProps extends WithAuthUser {
  eventId: number;
}
const AddReviewPage = ({ user, eventId }: AddReviewPageProps) => {
  const eventQueryResult = useQuery(EVENT, {
    variables: { eventId },
  });
  return (
    <QueryResult
      queryResult={eventQueryResult}
      queryName="eventById"
      render={(eventFragment) => <ReviewEventParticipants user={user} event={getEventFragmentData(eventFragment)} />}
      // renderOnNoData={<NoData wrapInContentContainer />}
    />
  );
};

