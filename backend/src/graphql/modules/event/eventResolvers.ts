import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { GraphQLError } from 'graphql/error';

import { sendEmail } from '../../../libs/nodeMailer';
import { DEFAULT_LIMIT, HAVERSINE_FORMULA } from '../../../sharedConstants';
import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventType,
  Group,
  Location,
  MutationCancelEventArgs,
  MutationCreateEventArgs,
  MutationDeleteEventArgs,
  MutationEditEventArgs,
  MutationMassEmailToEventParticipantsArgs,
  MutationMoreEventsLikeThisArgs,
  MutationRequestEventRegistrationArgs,
  MutationResolveEventRegistrationArgs,
  MutationUploadEventImageArgs,
  ParticipantState,
  ParticipantType,
  QueryEventByIdArgs,
  QueryEventsArgs,
  QueryEventsByIdsArgs,
  QueryFilterEventsArgs,
  QueryInterestingNearbyEventsArgs,
  QueryNewlyCreatedNearbyEventsArgs,
  QuerySimilarEventsArgs,
  QueryTodaysNearbyEventsArgs,
  QueryUserCreatedEventsArgs,
  User,
} from '../../../types';
import { createEventInput, getPublicStorageFilePath } from '../../../utils/helpers';

import { deleteEventInTransaction } from './deleteEventInTransaction';
import { sendMassEmailToEventParticipants } from './sendMassEmailToEventParticipants';
import { sendMassEventCancelledEmail } from './sendMassEventCancelledEmail';

const MINIMUM_COUNT_SIMILAR_EVENTS = 3;

const FRONTEND_PROFILE_IMAGE_RELATIVE_PATH = 'uploads/event_image';

export const eventsResolver: ContextualResolver<Array<Event>, QueryEventsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.events.getAll(offset, limit, { value: 'created_at', order: 'desc' });

export const eventAuthorResolver: ContextualResolverWithParent<User | Group, Event> = async (
  parent,
  _,
  { dataSources },
) => {
  if (parent.author_id) {
    return (await dataSources.sql.users.getById(parent.author_id)) as unknown as User;
  }
  if (parent.group_id) {
    return (await dataSources.sql.groups.getById(parent.group_id)) as unknown as Group;
  }
  throw Error('Event has no author.');
};

export const eventLocationResolver: ContextualResolverWithParent<Location, Event> = async (
  parent,
  _,
  { dataSources },
) => (await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location;

export const eventEventTypesResolver: ContextualResolverWithParent<Array<EventType>, Event> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.events.getEventEventTypes(parent.id);

export const eventParticipantsResolver: ContextualResolverWithParent<Array<ParticipantType>, Event> = async (
  parent,
  _,
  { dataSources },
) => {
  const pending = await dataSources.sql.events.getPendingEventParticipants(parent.id);
  const accepted = await dataSources.sql.events.getAcceptedEventParticipants(parent.id);
  const pendingText = await dataSources.sql.events.getPendingEventText(parent.id);

  return [
    ...pending.map((user, index) => ({
      user: user,
      state: ParticipantState.Pending,
      text: pendingText[index]?.text,
    })),
    ...accepted.map((user) => ({
      user: user,
      state: ParticipantState.Accepted,
    })),
  ];
};

export const eventByIdResolver: ContextualNullableResolver<Event, QueryEventByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.events.getById(id);

export const eventsByIdsResolver: ContextualResolver<Array<Event>, QueryEventsByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.events.getByIds(ids);

export const newlyCreatedNearbyEventsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit, user_id }: QueryNewlyCreatedNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const blockerIds = user_id ? await dataSources.sql.users.getBlockersIds(user_id) : null;
  return dataSources.sql.events.getNewlyCreatedNearbyEvents(distance, offset, limit, blockerIds);
};

export const todaysNearbyEventsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit, user_id }: QueryTodaysNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const todaysDateString = new Date().toISOString().split('T')[0];
  const blockerIds = user_id ? await dataSources.sql.users.getBlockersIds(user_id) : null;
  return dataSources.sql.events.getTodaysNearbyEvents(distance, todaysDateString, offset, limit, blockerIds);
};

export const weeklyNearbyEventsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit, user_id }: QueryTodaysNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const blockerIds = user_id ? await dataSources.sql.users.getBlockersIds(user_id) : null;

  const todaysDate = new Date();
  const nextWeekDate = new Date();
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);

  const todaysDateString = todaysDate.toISOString().split('T')[0];
  const nextWeekDateString = nextWeekDate.toISOString().split('T')[0];

  return dataSources.sql.events.getWeeklyNearbyEvents(
    distance,
    todaysDateString,
    nextWeekDateString,
    offset,
    limit,
    blockerIds,
  );
};

export const interestingNearbyEventsResolver = async (
  _: unknown,
  { latitude, longitude, userId, offset, limit }: QueryInterestingNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const blockerIds = await dataSources.sql.users.getBlockersIds(userId);
  return dataSources.sql.events.getInterestingNearbyEvents(distance, userId, blockerIds, offset, limit);
};

export const similarEventsResolver = async (
  _: unknown,
  { eventId, city, eventTypeIds, offset, limit, user_id }: QuerySimilarEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;
  const blockerIds = user_id ? await dataSources.sql.users.getBlockersIds(user_id) : null;

  const similarEventsWithinSameCity: Array<Event> = await dataSources.sql.events.getEventsWithSameTypeInCity(
    eventId,
    eventTypeIds,
    city,
    offset,
    limit,
    blockerIds,
  );

  const similarEventsCount = similarEventsWithinSameCity.length;

  if (similarEventsCount < MINIMUM_COUNT_SIMILAR_EVENTS) {
    const similarEventsOutsideCity = await dataSources.sql.events.getEventsWithSameTypeExceptCity(
      eventId,
      eventTypeIds,
      city,
      0,
      limit - similarEventsCount,
      blockerIds,
    );
    return [...similarEventsWithinSameCity, ...similarEventsOutsideCity];
  }

  return similarEventsWithinSameCity;
};

export const uploadEventImageResolver = async (_: unknown, { event_image }: MutationUploadEventImageArgs) => {
  let eventImageUrl = null;
  const eventImageFile = await event_image;

  if (eventImageFile) {
    const { fileDirectoryPath, filePath, relativeFileUrl } = getPublicStorageFilePath({
      filename: eventImageFile.filename,
      relativeDirectory: FRONTEND_PROFILE_IMAGE_RELATIVE_PATH,
    });

    await fsPromises.mkdir(fileDirectoryPath, { recursive: true });

    const stream = eventImageFile.createReadStream();
    stream.pipe(fs.createWriteStream(filePath));

    eventImageUrl = relativeFileUrl;
  }

  return eventImageUrl;
};

export const createEventResolver = async (
  _: unknown,
  { location, event }: MutationCreateEventArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (event.author_id && event.group_id) {
    throw new GraphQLError("Event can't have both author_id and group_id!");
  }

  event.location_id = await dataSources.sql.locations.createLocation(location, googleMapsClient);

  const dbResponse = await dataSources.sql.db.write('Event').insert(createEventInput(event));
  if (!dbResponse[0]) {
    throw new GraphQLError(`Error while creating event!`);
  }

  const dbResult = await dataSources.sql.events.getById(dbResponse[0]);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying just created event - it should exist but doesn't!`);
  }

  const event_id = dbResponse[0];
  // Use map to create an array of insert promises
  const insertPromises = event.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('Event_EventType').insert({ event_id: event_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbEventEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbEventEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while inserting into Event_EventType table!`);
  }

  return dbResult;
};

export const editEventResolver = async (
  _: unknown,
  { location, event }: MutationEditEventArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (!event.id) {
    throw new GraphQLError('Event ID needs to be filled in order to update!');
  }
  if (event.author_id && event.group_id) {
    throw new GraphQLError("Event can't have both author_id and group_id!");
  }
  if (!location.id && !event.location_id) {
    throw new GraphQLError('Location ID needs to be filled in order to update!');
  }
  if (event.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to update!');
  }

  location.id = location.id ? location.id : event.location_id;
  await dataSources.sql.locations.updateLocation(location, googleMapsClient);

  await dataSources.sql.eventTypes.updateEvent_EventTypeRelation(event.id, event.event_type_ids);

  const dbResponse = await dataSources.sql.db.write('Event').where('id', '=', event.id).update(createEventInput(event));

  if (!dbResponse) {
    throw new GraphQLError(`Error while updating event!`);
  }

  const dbResult = await dataSources.sql.events.getById(event.id);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying group!`);
  }

  return dbResult;
};

export const deleteEventResolver = async (
  _: unknown,
  { event_id, location_id }: MutationDeleteEventArgs,
  { dataSources }: CustomContext,
): Promise<string> => deleteEventInTransaction(event_id, location_id, dataSources.sql);

export const filterEventResolver = async (
  _: unknown,
  { eventTypeIds, start_datetime, end_datetime, filterLocation, offset, limit, sort, user_id }: QueryFilterEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;
  const blockerIds = user_id ? await dataSources.sql.users.getBlockersIds(user_id) : null;
  const events = await dataSources.sql.events.getFilteredEvents(
    offset,
    limit,
    eventTypeIds,
    start_datetime,
    end_datetime,
    filterLocation,
    sort ? sort.toString() : null,
    blockerIds,
  );

  return events[0];
};

export const userCreatedEventsResolver: ContextualResolver<Array<Event>, QueryUserCreatedEventsArgs> = async (
  _: unknown,
  { userId, offset, limit },
  { dataSources },
) => await dataSources.sql.events.getUserCreatedEvents(userId, offset, limit);

export const requestEventRegistrationResolver = async (
  _: unknown,
  { eventRegistration }: MutationRequestEventRegistrationArgs,
  { dataSources }: CustomContext,
): Promise<string> => {
  let author;

  if (eventRegistration.author_id) {
    author = await dataSources.sql.users.getById(eventRegistration.author_id);
  } else if (eventRegistration.group_id) {
    author = await dataSources.sql.groups.getGroupAdmin(eventRegistration.group_id);
  } else {
    throw new GraphQLError('Event registration needs to have at least one author id!');
  }

  if (!author) {
    throw new GraphQLError(`Invalid user or group id as event author!`);
  }

  await dataSources.sql.db
    .write('Event_UserRequest')
    .insert({ event_id: eventRegistration.event_id, user_id: eventRegistration.user_id, text: eventRegistration.text })
    .catch(() => {
      throw new GraphQLError('There was an unexpected error while inserting into Event_UserRequest table!');
    });

  try {
    await sendEmail(eventRegistration.user_email, 'Event registration', {
      text: 'Thank you for your interest! Admin of the event received information about your application. You will receive an email notification right after his/her approval.',
    });
  } catch (error) {
    throw error;
  }

  try {
    await sendEmail(author.email, 'User requested event registration', {
      text: `User ${eventRegistration.user_name} requested registration for your event ${eventRegistration.event_name}.`,
      html: `User ${eventRegistration.user_name} requested registration for your event <a href="https://frontend-team01-vse.handson.pro/event/${eventRegistration.event_id}">${eventRegistration.event_name}</a>.`,
    });
  } catch (error) {
    throw error;
  }

  return `Registration request for event ${eventRegistration.event_name} by user ${eventRegistration.user_name} was sent!`;
};

export const resolveEventRegistrationResolver = async (
  _: unknown,
  { resolve }: MutationResolveEventRegistrationArgs,
  { dataSources }: CustomContext,
): Promise<string> => {
  if (resolve.resolution) {
    await dataSources.sql.db
      .write('Event_User')
      .insert({
        event_id: resolve.event_id,
        user_id: resolve.user_id,
      })
      .catch(() => {
        throw new GraphQLError('Error while inserting into Event_User table!');
      })
      .then(async () => {
        await dataSources.sql.db
          .write('Event_UserRequest')
          .where('event_id', resolve.event_id)
          .andWhere('user_id', resolve.user_id)
          .delete();
      })
      .catch(() => {
        throw new GraphQLError('Error while deleting from Event_UserRequest table!');
      })
      .then(async () => {
        try {
          await sendEmail(resolve.user_email, 'Event registration confirmed', {
            text: `Your registration for event ${resolve.event_name} has been confirmed!`,
            html: `Your registration for event <a href="https://frontend-team01-vse.handson.pro/event/${resolve.event_id}">${resolve.event_name}</a> has been confirmed!`,
          });
        } catch (error) {
          throw error;
        }
      });
  } else {
    await dataSources.sql.db
      .write('Event_UserRequest')
      .where('event_id', resolve.event_id)
      .andWhere('user_id', resolve.user_id)
      .delete()
      .catch(() => {
        throw new GraphQLError('Error while deleting from Event_UserRequest table!');
      })
      .then(async () => {
        try {
          await sendEmail(resolve.user_email, 'Event registration declined', {
            text: `Unfortunately, your registration for event ${resolve.event_name} has been declined.`,
            html: `Unfortunately, your registration for event <a href="https://frontend-team01-vse.handson.pro/event/${resolve.event_id}">${resolve.event_name}</a> has been declined.`,
          });
        } catch (error) {
          throw error;
        }
      });
  }

  return 'Event registration resolved.';
};

export const cancelEventResolver = async (
  _: unknown,
  { eventId }: MutationCancelEventArgs,
  { dataSources, serverUrl }: CustomContext,
) => {
  const event = await dataSources.sql.events.getById(eventId);
  if (!event) {
    throw new GraphQLError('Event not found');
  }
  if (event.cancelled) {
    throw new GraphQLError('Event has already been cancelled');
  }

  const dbResponse = await dataSources.sql.events.setCancelled(eventId, true);
  if (!dbResponse) {
    throw new GraphQLError("Event can't be cancelled");
  }

  const eventAcceptedParticipants = await dataSources.sql.events.getAcceptedEventParticipants(eventId);
  const eventPendingParticipants = await dataSources.sql.events.getPendingEventParticipants(eventId);
  const eventParticipants: Set<User> = new Set([...eventAcceptedParticipants, ...eventPendingParticipants]);

  await sendMassEventCancelledEmail(event, eventParticipants, serverUrl);
  return 'Event successfully cancelled';
};

export const massEmailToEventParticipantsResolver = async (
  _: unknown,
  { eventId, emailSubject, emailBody }: MutationMassEmailToEventParticipantsArgs,
  { dataSources, serverUrl }: CustomContext,
) => {
  const event = await dataSources.sql.events.getById(eventId);
  if (!event) {
    throw new GraphQLError('Event not found');
  }

  // send email only to accepted participants
  const eventAcceptedParticipants = await dataSources.sql.events.getAcceptedEventParticipants(eventId);

  await sendMassEmailToEventParticipants(event, eventAcceptedParticipants, emailSubject, emailBody, serverUrl);
  return 'Emails successfully sent';
};

export const moreEventsLikeThisResolver = async (
  _: unknown,
  { sender, recipient, eventId, eventName, emailBody }: MutationMoreEventsLikeThisArgs,
  __: unknown,
) => {
  try {
    await sendEmail(recipient.email, 'More events like this', {
      text: `User ${sender.first_name} would like  to see more events similar to\n${eventName}\nAn user has expressed interest in seeing more events similar to ${eventName}.\nCheck out their message below:\n${emailBody}`,
      html: `User <a href="https://frontend-team01-vse.handson.pro/profile/${sender.id}">${sender.first_name}</a> would like  to see more events similar to
<p><a href="https://frontend-team01-vse.handson.pro/event/${eventId}">${eventName}</a></p>
<p>An user has expressed interest in seeing more events similar to <a href="https://frontend-team01-vse.handson.pro/event/${eventId}">${eventName}</a>.</p>
<p>Check out their message below:</p>
<p>${emailBody}</p>`,
    });
  } catch (error) {
    throw error;
  }

  return 'Email sent successfully!';
};
