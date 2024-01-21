import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { EventDetails } from '../components';
import { EVENT } from '../queries';

interface EventDetailsProps {
  eventId: number;
}

const EventDetailsPage = ({ eventId }: EventDetailsProps) => {
  const eventQueryResult = useQuery(EVENT, {
    variables: { eventId },
  });

  return (
    <QueryResult
      queryResult={eventQueryResult}
      queryName="eventById"
      render={(eventFragment) => <EventDetails event={getEventFragmentData(eventFragment)} />}
      noDataTitle="Event Missing in Action!"
      noDataDescription="Looks like the event you're looking for has vanished! Maybe it's a typo or the event is over. Don't worry, there are plenty more exciting events to discover!"
    />
  );
};

export const EventDetailsPageContainer = () => {
  let param = useParams();

  return param.eventId ? <EventDetailsPage eventId={parseInt(param.eventId)} /> : null;
};

