/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        event_types {\n          id\n          name\n          category\n        }\n        location {\n          longitude\n          latitude\n        }\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($email: String!, $first_name: String!, $last_name: String!, $password: String!) {\n    signUp(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {\n      user {\n        id\n        first_name\n        last_name\n        email\n      }\n      token\n    }\n  }\n':
    types.SignUpDocument,
  '\n  mutation Mutation($token: String!) {\n    verify(token: $token)\n  }\n': types.MutationDocument,
  '\n  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    createEvent(event: $event, location: $location) {\n      id\n    }\n  }\n':
    types.CreateEventDocument,
  '\n  query EventById($id: Int!) {\n    eventById(id: $id) {\n      ...EventFragment\n    }\n  }\n':
    types.EventByIdDocument,
  '\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n':
    types.EditEventDocument,
  '\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      id\n      first_name\n      last_name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filePath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n    }\n  }\n':
    types.EventFragmentFragmentDoc,
  '\n  query GetLocationAwareEvents($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n    interestingNearbyEvents(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...EventFragment\n    }\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.GetLocationAwareEventsDocument,
  '\n  query Events($offset: Int, $limit: Int) {\n    events(offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.EventsDocument,
  '\n  query TodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.TodaysNearbyEventsDocument,
  '\n  query InterestingNearbyEvents($longitude: Float!, $latitude: Float!, $userId: Int! $offset: Int, $limit: Int) {\n    interestingNearbyEvents(longitude: $longitude, latitude: $latitude, userId: $userId, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.InterestingNearbyEventsDocument,
  '\n  query NewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.NewlyCreatedNearbyEventsDocument,
  '\n  query Query($eventId: Int!) {\n    eventById(id: $eventId) {\n      ...EventFragment\n    }\n  }\n':
    types.QueryDocument,
  '\n  query FilterEvents($offset: Int, $limit: Int, $eventTypeIds: [Int!], $startDatetime: String, $endDatetime: String, $filterLocation: FilterLocationInput, $sort: SortType) {\n    filterEvents(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, start_datetime: $startDatetime, end_datetime: $endDatetime, filterLocation: $filterLocation, sort: $sort) {\n      ...EventFragment\n    }\n  }\n':
    types.FilterEventsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        event_types {\n          id\n          name\n          category\n        }\n        location {\n          longitude\n          latitude\n        }\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        event_types {\n          id\n          name\n          category\n        }\n        location {\n          longitude\n          latitude\n        }\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignUp($email: String!, $first_name: String!, $last_name: String!, $password: String!) {\n    signUp(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {\n      user {\n        id\n        first_name\n        last_name\n        email\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignUp($email: String!, $first_name: String!, $last_name: String!, $password: String!) {\n    signUp(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {\n      user {\n        id\n        first_name\n        last_name\n        email\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Mutation($token: String!) {\n    verify(token: $token)\n  }\n',
): (typeof documents)['\n  mutation Mutation($token: String!) {\n    verify(token: $token)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    createEvent(event: $event, location: $location) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    createEvent(event: $event, location: $location) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query EventById($id: Int!) {\n    eventById(id: $id) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query EventById($id: Int!) {\n    eventById(id: $id) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n',
): (typeof documents)['\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      id\n      first_name\n      last_name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filePath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n    }\n  }\n',
): (typeof documents)['\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      id\n      first_name\n      last_name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filePath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetLocationAwareEvents($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n    interestingNearbyEvents(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...EventFragment\n    }\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query GetLocationAwareEvents($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n    interestingNearbyEvents(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...EventFragment\n    }\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Events($offset: Int, $limit: Int) {\n    events(offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query Events($offset: Int, $limit: Int) {\n    events(offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query TodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query TodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query InterestingNearbyEvents($longitude: Float!, $latitude: Float!, $userId: Int! $offset: Int, $limit: Int) {\n    interestingNearbyEvents(longitude: $longitude, latitude: $latitude, userId: $userId, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query InterestingNearbyEvents($longitude: Float!, $latitude: Float!, $userId: Int! $offset: Int, $limit: Int) {\n    interestingNearbyEvents(longitude: $longitude, latitude: $latitude, userId: $userId, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query NewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query NewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Query($eventId: Int!) {\n    eventById(id: $eventId) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query Query($eventId: Int!) {\n    eventById(id: $eventId) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FilterEvents($offset: Int, $limit: Int, $eventTypeIds: [Int!], $startDatetime: String, $endDatetime: String, $filterLocation: FilterLocationInput, $sort: SortType) {\n    filterEvents(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, start_datetime: $startDatetime, end_datetime: $endDatetime, filterLocation: $filterLocation, sort: $sort) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query FilterEvents($offset: Int, $limit: Int, $eventTypeIds: [Int!], $startDatetime: String, $endDatetime: String, $filterLocation: FilterLocationInput, $sort: SortType) {\n    filterEvents(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, start_datetime: $startDatetime, end_datetime: $endDatetime, filterLocation: $filterLocation, sort: $sort) {\n      ...EventFragment\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
