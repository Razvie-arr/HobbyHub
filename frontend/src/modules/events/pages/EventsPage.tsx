import { MainFilters } from '../../../shared/filters';
import { ContentContainer, QueryResult } from '../../../shared/layout';

export const EventsPage = () => (
  <>
    <MainFilters />
    <ContentContainer>
      {/* <QueryResult
        queryResult={useQuery(EVENTS, {
          variables: { offset: 0, limit: 4 },
        })}
        render={(data) => (
          <Stack spacing="8">
            <EventsSection events={data.events.map(toFragmentData)} title="Events" />
          </Stack>
        )}
      /> */}
    </ContentContainer>
  </>
);

