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
  '\n  mutation OnboardUser($user: UserInput!, $location: LocationInputWithoutCoords!) {\n    onboardUser(user: $user, location: $location) {\n      id\n      email\n      first_name\n      last_name\n      verified\n      location_id\n      description\n      password\n      location {\n        id\n        country\n        city\n        street_name\n        street_number\n        latitude\n        longitude\n      }\n      event_types {\n        id\n        name\n        category\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n':
    types.OnboardUserDocument,
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        first_name\n        last_name\n        verified\n        location_id\n        description\n        location {\n          id\n          country\n          city\n          street_name\n          street_number\n          latitude\n          longitude\n        }\n        event_types {\n          id\n          name\n          category\n        }\n        groups {\n          id\n          name\n        }\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp($email: String!, $first_name: String!, $last_name: String!, $password: String!) {\n    signUp(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {\n      user {\n        id\n        first_name\n        last_name\n        email\n      }\n      token\n    }\n  }\n':
    types.SignUpDocument,
  '\n  mutation Mutation($token: String!) {\n    verify(token: $token)\n  }\n': types.MutationDocument,
  '\n  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    createEvent(event: $event, location: $location) {\n      id\n    }\n  }\n':
    types.CreateEventDocument,
  '\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n':
    types.EditEventDocument,
  '\n  mutation DeleteEvent($eventId: Int!, $locationId: Int!) {\n    deleteEvent(event_id: $eventId, location_id: $locationId) \n  }\n':
    types.DeleteEventDocument,
  '\n  mutation UploadEventImage($eventImage: Upload) {\n    uploadEventImage(event_image: $eventImage)\n}\n':
    types.UploadEventImageDocument,
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
  '\n  query SimilarEvents($eventId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarEvents(eventId: $eventId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...EventFragment\n    }\n  }\n':
    types.SimilarEventsDocument,
  '\n  mutation CreateGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    createGroup(group: $group, location: $location) {\n      id\n    }\n  }\n':
    types.CreateGroupDocument,
  '\n  mutation EditGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    editGroup(group: $group, location: $location) {\n      id\n    }\n}\n':
    types.EditGroupDocument,
  '\n  mutation DeleteGroup($groupId: Int!, $locationId: Int!) {\n    deleteGroup(group_id: $groupId, location_id: $locationId) \n  }\n':
    types.DeleteGroupDocument,
  '\n  mutation UploadGroupImage($groupImage: Upload) {\n    uploadGroupImage(group_image: $groupImage)\n}\n':
    types.UploadGroupImageDocument,
  '\n  query Groups($offset: Int, $limit: Int) {\n    groups(offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n':
    types.GroupsDocument,
  '\n  query GroupById($groupId: Int!) {\n    groupById(id: $groupId) {\n      ...GroupFragment\n    }\n  }\n':
    types.GroupByIdDocument,
  '\n  query FilterGroups($offset: Int, $limit: Int, $eventTypeIds: [Int!], $filterLocation: FilterLocationInput, $sort: GroupSortType) {\n    filterGroups(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, filterLocation: $filterLocation, sort: $sort) {\n      ...GroupFragment\n    }\n  }\n':
    types.FilterGroupsDocument,
  '\n  query GetLocationAwareGroups($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    nearbyGroups(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n    interestingNearbyGroups(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...GroupFragment\n    }\n  }\n':
    types.GetLocationAwareGroupsDocument,
  '\n  query SimilarGroups($groupId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarGroups(groupId: $groupId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...GroupFragment\n    }\n  }\n':
    types.SimilarGroupsDocument,
  '\n  mutation EditReadThread($userId: Int!, $threadId: Int!, $read: Boolean!) {\n    editReadThread(userId: $userId, threadId: $threadId, read: $read)\n  }\n':
    types.EditReadThreadDocument,
  '\n  mutation SendMessage($sender: SenderInput!, $recipient: RecipientInput!, $text: String!) {\n    sendMessage(sender: $sender, recipient: $recipient, text: $text)\n  }\n':
    types.SendMessageDocument,
  '\n  query Threads($userId: Int!) {\n    threads(userId: $userId) {\n      ...ThreadFragment\n    }\n  }\n':
    types.ThreadsDocument,
  '\n  query MessagesByThreadId($threadId: Int!) {\n    messagesByThreadId(threadId: $threadId) {\n      ...MessageFragment\n    }\n  }\n':
    types.MessagesByThreadIdDocument,
  '\n  query SearchEvents($text: String!, $offset: Int, $limit: Int) {\n    searchEvents(text: $text, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n':
    types.SearchEventsDocument,
  '\n  query SearchGroups($text: String!, $offset: Int, $limit: Int) {\n    searchGroups(text: $text, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n':
    types.SearchGroupsDocument,
  '\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      ... on User {\n        __typename\n        id\n        first_name\n        last_name\n        email\n      }\n      ... on Group {\n        __typename\n        id\n        name\n        admin {\n          id\n          first_name\n          last_name\n          email\n        }\n      }\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filepath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n':
    types.EventFragmentFragmentDoc,
  '\n  fragment GroupFragment on Group {\n    id\n    name\n    admin {\n      id\n      first_name\n      last_name\n      email\n    }\n    event_types {\n      id\n      name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    events {\n      ...EventFragment\n    }\n    members {\n      id\n      first_name\n      last_name\n      email\n    }\n    summary\n    description\n    image_filepath\n  }\n':
    types.GroupFragmentFragmentDoc,
  '\n  fragment MessageFragment on Message {\n    id\n    thread_id\n    sender_id\n    text\n    sent_at\n    sender {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n':
    types.MessageFragmentFragmentDoc,
  '\n  fragment ThreadFragment on Thread {\n    id\n    last_message_at\n    thread_read\n    users {\n      id\n      first_name\n      last_name\n      email\n    }\n    lastMessage {\n      ...MessageFragment\n    }\n    messages {\n      ...MessageFragment\n    }\n  }\n':
    types.ThreadFragmentFragmentDoc,
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
  source: '\n  mutation OnboardUser($user: UserInput!, $location: LocationInputWithoutCoords!) {\n    onboardUser(user: $user, location: $location) {\n      id\n      email\n      first_name\n      last_name\n      verified\n      location_id\n      description\n      password\n      location {\n        id\n        country\n        city\n        street_name\n        street_number\n        latitude\n        longitude\n      }\n      event_types {\n        id\n        name\n        category\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation OnboardUser($user: UserInput!, $location: LocationInputWithoutCoords!) {\n    onboardUser(user: $user, location: $location) {\n      id\n      email\n      first_name\n      last_name\n      verified\n      location_id\n      description\n      password\n      location {\n        id\n        country\n        city\n        street_name\n        street_number\n        latitude\n        longitude\n      }\n      event_types {\n        id\n        name\n        category\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        first_name\n        last_name\n        verified\n        location_id\n        description\n        location {\n          id\n          country\n          city\n          street_name\n          street_number\n          latitude\n          longitude\n        }\n        event_types {\n          id\n          name\n          category\n        }\n        groups {\n          id\n          name\n        }\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        email\n        first_name\n        last_name\n        verified\n        location_id\n        description\n        location {\n          id\n          country\n          city\n          street_name\n          street_number\n          latitude\n          longitude\n        }\n        event_types {\n          id\n          name\n          category\n        }\n        groups {\n          id\n          name\n        }\n      }\n      token\n    }\n  }\n'];
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
  source: '\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n',
): (typeof documents)['\n  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {\n    editEvent(event: $event, location: $location) {\n      id\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteEvent($eventId: Int!, $locationId: Int!) {\n    deleteEvent(event_id: $eventId, location_id: $locationId) \n  }\n',
): (typeof documents)['\n  mutation DeleteEvent($eventId: Int!, $locationId: Int!) {\n    deleteEvent(event_id: $eventId, location_id: $locationId) \n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UploadEventImage($eventImage: Upload) {\n    uploadEventImage(event_image: $eventImage)\n}\n',
): (typeof documents)['\n  mutation UploadEventImage($eventImage: Upload) {\n    uploadEventImage(event_image: $eventImage)\n}\n'];
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
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SimilarEvents($eventId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarEvents(eventId: $eventId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query SimilarEvents($eventId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarEvents(eventId: $eventId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    createGroup(group: $group, location: $location) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    createGroup(group: $group, location: $location) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    editGroup(group: $group, location: $location) {\n      id\n    }\n}\n',
): (typeof documents)['\n  mutation EditGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {\n    editGroup(group: $group, location: $location) {\n      id\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteGroup($groupId: Int!, $locationId: Int!) {\n    deleteGroup(group_id: $groupId, location_id: $locationId) \n  }\n',
): (typeof documents)['\n  mutation DeleteGroup($groupId: Int!, $locationId: Int!) {\n    deleteGroup(group_id: $groupId, location_id: $locationId) \n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UploadGroupImage($groupImage: Upload) {\n    uploadGroupImage(group_image: $groupImage)\n}\n',
): (typeof documents)['\n  mutation UploadGroupImage($groupImage: Upload) {\n    uploadGroupImage(group_image: $groupImage)\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Groups($offset: Int, $limit: Int) {\n    groups(offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query Groups($offset: Int, $limit: Int) {\n    groups(offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GroupById($groupId: Int!) {\n    groupById(id: $groupId) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query GroupById($groupId: Int!) {\n    groupById(id: $groupId) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FilterGroups($offset: Int, $limit: Int, $eventTypeIds: [Int!], $filterLocation: FilterLocationInput, $sort: GroupSortType) {\n    filterGroups(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, filterLocation: $filterLocation, sort: $sort) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query FilterGroups($offset: Int, $limit: Int, $eventTypeIds: [Int!], $filterLocation: FilterLocationInput, $sort: GroupSortType) {\n    filterGroups(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, filterLocation: $filterLocation, sort: $sort) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetLocationAwareGroups($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    nearbyGroups(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n    interestingNearbyGroups(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query GetLocationAwareGroups($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {\n    nearbyGroups(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n    interestingNearbyGroups(\n      longitude: $longitude\n      latitude: $latitude\n      userId: $userId\n      offset: $offset\n      limit: $limit\n    ) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SimilarGroups($groupId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarGroups(groupId: $groupId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query SimilarGroups($groupId: Int!, $city: String!, $eventTypeIds: [Int!]!) {\n    similarGroups(groupId: $groupId, city: $city, eventTypeIds: $eventTypeIds) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditReadThread($userId: Int!, $threadId: Int!, $read: Boolean!) {\n    editReadThread(userId: $userId, threadId: $threadId, read: $read)\n  }\n',
): (typeof documents)['\n  mutation EditReadThread($userId: Int!, $threadId: Int!, $read: Boolean!) {\n    editReadThread(userId: $userId, threadId: $threadId, read: $read)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SendMessage($sender: SenderInput!, $recipient: RecipientInput!, $text: String!) {\n    sendMessage(sender: $sender, recipient: $recipient, text: $text)\n  }\n',
): (typeof documents)['\n  mutation SendMessage($sender: SenderInput!, $recipient: RecipientInput!, $text: String!) {\n    sendMessage(sender: $sender, recipient: $recipient, text: $text)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Threads($userId: Int!) {\n    threads(userId: $userId) {\n      ...ThreadFragment\n    }\n  }\n',
): (typeof documents)['\n  query Threads($userId: Int!) {\n    threads(userId: $userId) {\n      ...ThreadFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query MessagesByThreadId($threadId: Int!) {\n    messagesByThreadId(threadId: $threadId) {\n      ...MessageFragment\n    }\n  }\n',
): (typeof documents)['\n  query MessagesByThreadId($threadId: Int!) {\n    messagesByThreadId(threadId: $threadId) {\n      ...MessageFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SearchEvents($text: String!, $offset: Int, $limit: Int) {\n    searchEvents(text: $text, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n',
): (typeof documents)['\n  query SearchEvents($text: String!, $offset: Int, $limit: Int) {\n    searchEvents(text: $text, offset: $offset, limit: $limit) {\n      ...EventFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SearchGroups($text: String!, $offset: Int, $limit: Int) {\n    searchGroups(text: $text, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n',
): (typeof documents)['\n  query SearchGroups($text: String!, $offset: Int, $limit: Int) {\n    searchGroups(text: $text, offset: $offset, limit: $limit) {\n      ...GroupFragment\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      ... on User {\n        __typename\n        id\n        first_name\n        last_name\n        email\n      }\n      ... on Group {\n        __typename\n        id\n        name\n        admin {\n          id\n          first_name\n          last_name\n          email\n        }\n      }\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filepath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n',
): (typeof documents)['\n  fragment EventFragment on Event {\n    id\n    name\n    start_datetime\n    end_datetime\n    event_types {\n      id\n      name\n    }\n    author {\n      ... on User {\n        __typename\n        id\n        first_name\n        last_name\n        email\n      }\n      ... on Group {\n        __typename\n        id\n        name\n        admin {\n          id\n          first_name\n          last_name\n          email\n        }\n      }\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    summary\n    description\n    image_filepath\n    capacity\n    allow_waitlist\n    participants {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment GroupFragment on Group {\n    id\n    name\n    admin {\n      id\n      first_name\n      last_name\n      email\n    }\n    event_types {\n      id\n      name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    events {\n      ...EventFragment\n    }\n    members {\n      id\n      first_name\n      last_name\n      email\n    }\n    summary\n    description\n    image_filepath\n  }\n',
): (typeof documents)['\n  fragment GroupFragment on Group {\n    id\n    name\n    admin {\n      id\n      first_name\n      last_name\n      email\n    }\n    event_types {\n      id\n      name\n    }\n    location {\n      id\n      country\n      city\n      street_name\n      street_number\n      longitude\n      latitude\n    }\n    events {\n      ...EventFragment\n    }\n    members {\n      id\n      first_name\n      last_name\n      email\n    }\n    summary\n    description\n    image_filepath\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment MessageFragment on Message {\n    id\n    thread_id\n    sender_id\n    text\n    sent_at\n    sender {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n',
): (typeof documents)['\n  fragment MessageFragment on Message {\n    id\n    thread_id\n    sender_id\n    text\n    sent_at\n    sender {\n      id\n      first_name\n      last_name\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ThreadFragment on Thread {\n    id\n    last_message_at\n    thread_read\n    users {\n      id\n      first_name\n      last_name\n      email\n    }\n    lastMessage {\n      ...MessageFragment\n    }\n    messages {\n      ...MessageFragment\n    }\n  }\n',
): (typeof documents)['\n  fragment ThreadFragment on Thread {\n    id\n    last_message_at\n    thread_read\n    users {\n      id\n      first_name\n      last_name\n      email\n    }\n    lastMessage {\n      ...MessageFragment\n    }\n    messages {\n      ...MessageFragment\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
