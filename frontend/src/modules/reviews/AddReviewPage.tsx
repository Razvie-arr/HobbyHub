import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import { QueryResult } from '../../shared/layout';
import { WithAuthUser } from '../../shared/types';
import { useAuth } from '../auth';

import { ReviewEventMembers } from './components';
import { UNREVIEWED_EVENT_PARTICIPANTS } from './queries';

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
  const unreviewedEventParticipantsResult = useQuery(UNREVIEWED_EVENT_PARTICIPANTS, {
    variables: { userId: user.id, eventId },
  });
  return (
    <QueryResult
      queryResult={unreviewedEventParticipantsResult}
      queryName="unreviewedEventParticipants"
      render={(unreviewedEventParticipants) => (
        <ReviewEventMembers eventId={eventId} user={user} participants={unreviewedEventParticipants} />
      )}
      // renderOnNoData={<NoData wrapInContentContainer />}
    />
  );
};

