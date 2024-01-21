import { GraphQLError } from 'graphql/error';

import { SQLDataSource } from '../../../datasource';

export const deleteEventInTransaction = async (
  eventId: number,
  locationId: number,
  sql: SQLDataSource,
): Promise<string> =>
  await sql.db.write
    .transaction(async (trx) => {
      const dbEventEventTypeResult = await trx('Event_EventType').where('event_id', eventId).delete();
      if (!dbEventEventTypeResult) {
        throw new GraphQLError(`Error while deleting event from Event_EventType table!`);
      }
      await sql.events.setNullReviewsEventId(trx, eventId);

      const dbEventResult = await trx('Event').where('id', eventId).delete();

      if (!dbEventResult) {
        throw new GraphQLError(`Error while deleting event!`);
      }

      const dbLocationResult = await trx('Location').where('id', locationId).delete();

      if (!dbLocationResult) {
        throw new GraphQLError(`Error while deleting location!`);
      }
      return 'Event and location deleted!';
    })
    .catch((error) => {
      throw new GraphQLError(error);
    });
