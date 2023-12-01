import { DataSourceKnex } from '@nic-jennings/sql-datasource';
import { GraphQLError } from 'graphql/error';

export const eventTypeDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  updateEvent_EventTypeRelation: async (event_id: number, event_type_ids: number[]) => {
    const dbDeleteEventEventTypeResponse = await db.write('Event_EventType').where('event_id', event_id).delete();

    if (!dbDeleteEventEventTypeResponse) {
      throw new GraphQLError(`Error while updating Event_EventType table part 1!`);
    }
    // Use map to create an array of insert promises
    const insertPromises = event_type_ids.map((eventTypeId) =>
      db
        .write('Event_EventType')
        .where('event_id', event_id)
        .insert({ event_id: event_id, event_type_id: eventTypeId }),
    );

    // Await all insertions
    const dbEventEventTypeResponses = await Promise.all(insertPromises);

    // Check if any of the insertions failed
    if (dbEventEventTypeResponses.some((response) => !response)) {
      throw new GraphQLError(`Error while updating Event_EventType table part 2!`);
    }
  },

  updateGroup_EventTypeRelation: async (group_id: number, event_type_ids: number[]) => {
    const dbDeleteGroupEventTypeResponse = await db.write('UserGroup_EventType').where('group_id', group_id).delete();

    if (!dbDeleteGroupEventTypeResponse) {
      throw new GraphQLError(`Error while updating UserGroup_EventType table part 1!`);
    }
    // Use map to create an array of insert promises
    const insertPromises = event_type_ids.map((eventTypeId) =>
      db
        .write('UserGroup_EventType')
        .where('group_id', group_id)
        .insert({ group_id: group_id, event_type_id: eventTypeId }),
    );

    // Await all insertions
    const dbGroupEventTypeResponses = await Promise.all(insertPromises);

    // Check if any of the insertions failed
    if (dbGroupEventTypeResponses.some((response) => !response)) {
      throw new GraphQLError(`Error while updating UserGroup_EventType table part 2!`);
    }
  },

  updateUser_EventTypeRelation: async (user_id: number, event_type_ids: number[]) => {
    //Swap old Event Types for new ones
    const dbDeleteUserEventTypeResponse = await db.write('User_EventType').where('user_id', user_id).delete();

    if (!dbDeleteUserEventTypeResponse) {
      throw new GraphQLError(`Error while updating User_EventType table part 1!`);
    }
    // Use map to create an array of insert promises
    const insertPromises = event_type_ids.map((eventTypeId) =>
      db.write('User_EventType').insert({ user_id: user_id, event_type_id: eventTypeId }),
    );

    // Await all insertions
    const dbUserEventTypeResponses = await Promise.all(insertPromises);

    // Check if any of the insertions failed
    if (dbUserEventTypeResponses.some((response) => !response)) {
      throw new GraphQLError(`Error while updating User_EventType table part 2!`);
    }
  },
});
