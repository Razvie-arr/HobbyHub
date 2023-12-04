import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { match } from 'ts-pattern';

import { NoData, NotAuthorized } from '../../shared/design-system';
import { QueryResult } from '../../shared/layout';
import { getEventFragmentData, WithAuthUser } from '../../shared/types';
import { getCurrentDateTime } from '../../utils/form';
import { useAuth } from '../auth';
import { EVENT } from '../events/queries';

import { ReviewEventMembers } from './components';
import { UNREVIEWED_EVENT_PARTICIPANTS } from './queries';

export const AddReviewPageContainer = () => {
  const { user } = useAuth();

  const [param] = useSearchParams();
  const eventId = param.get('eventId');

  if (!user) {
    return <NotAuthorized requireSignIn wrapInContentContainer />;
  }

  return eventId ? <AddReviewPage user={user} eventId={parseInt(eventId)} /> : <NoData wrapInContentContainer />;
};

interface AddReviewPageProps extends WithAuthUser {
  eventId: number;
}
const AddReviewPage = ({ user, eventId }: AddReviewPageProps) => {
  const eventQueryResult = useQuery(EVENT, { variables: { eventId } });
  const unreviewedEventParticipantsQueryResult = useQuery(UNREVIEWED_EVENT_PARTICIPANTS, {
    variables: { userId: user.id, eventId },
  });

  return (
    <QueryResult
      queryResult={eventQueryResult}
      queryName="eventById"
      render={(data) => {
        const event = getEventFragmentData(data);
        const hasEventEnded = getCurrentDateTime() > event.end_datetime.slice(0, 23);

        if (!hasEventEnded) {
          return (
            <NoData
              title={`${event.name} has yet to start`}
              description="You cannot leave feedback until after the event is over."
            />
          );
        }

        const organizer = match(event.author)
          .with({ __typename: 'User' }, (author) => author)
          .with({ __typename: 'Group' }, ({ admin }) => admin)
          .exhaustive();

        const isUserOrganizer = user.id === organizer.id;

        return (
          <QueryResult
            queryResult={unreviewedEventParticipantsQueryResult}
            queryName="unreviewedEventParticipants"
            render={(unreviewedEventParticipants) => (
              <ReviewEventMembers user={user} event={event} participants={unreviewedEventParticipants} />
            )}
            noDataDescription={`You have already left feedback for ${
              isUserOrganizer ? 'all the participants' : 'the organizer'
            } of this event`}
          />
        );
      }}
      noDataDescription="This event does not exist."
    />
  );
};

