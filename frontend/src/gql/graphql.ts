/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type AuthInfo = {
  __typename?: 'AuthInfo';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  event_types: Array<EventType>;
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  location?: Maybe<Location>;
  location_id?: Maybe<Scalars['Int']['output']>;
  password: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type Author = Group | User;

export type Event = {
  __typename?: 'Event';
  allow_waitlist: Scalars['Boolean']['output'];
  author: Author;
  author_id?: Maybe<Scalars['Int']['output']>;
  capacity: Scalars['Int']['output'];
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_datetime: Scalars['String']['output'];
  event_types: Array<EventType>;
  group_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image_filepath?: Maybe<Scalars['String']['output']>;
  location: Location;
  location_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participants: Array<User>;
  start_datetime: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type EventInput = {
  allow_waitlist: Scalars['Boolean']['input'];
  author_id?: InputMaybe<Scalars['Int']['input']>;
  capacity: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  end_datetime: Scalars['String']['input'];
  event_type_ids: Array<Scalars['Int']['input']>;
  group_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_filepath?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  start_datetime: Scalars['String']['input'];
  summary: Scalars['String']['input'];
};

export type EventType = {
  __typename?: 'EventType';
  category: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type FilterLocationInput = {
  distance: Scalars['Int']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Group = {
  __typename?: 'Group';
  admin: User;
  admin_id: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  event_types: Array<EventType>;
  events: Array<Event>;
  id: Scalars['Int']['output'];
  image_filepath?: Maybe<Scalars['String']['output']>;
  location: Location;
  location_id: Scalars['Int']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type GroupInput = {
  admin_id: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  event_type_ids: Array<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_filepath?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  summary: Scalars['String']['input'];
};

export enum GroupSortType {
  Distance = 'DISTANCE',
  Name = 'NAME',
}

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  street_name: Scalars['String']['output'];
  street_number: Scalars['String']['output'];
};

export type LocationInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  street_name: Scalars['String']['input'];
  street_number: Scalars['String']['input'];
};

export type LocationInputWithoutCoords = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  street_name: Scalars['String']['input'];
  street_number: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int']['output'];
  sender: User;
  sender_id: Scalars['Int']['output'];
  sent_at: Scalars['String']['output'];
  text: Scalars['String']['output'];
  thread_id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createEvent: Event;
  createGroup: Group;
  createLocation?: Maybe<Location>;
  deleteEvent: Scalars['String']['output'];
  deleteGroup: Scalars['String']['output'];
  deleteLocation: Scalars['String']['output'];
  deleteUser: Scalars['String']['output'];
  editEvent: Event;
  editGroup: Group;
  editLocation?: Maybe<Location>;
  editReadThread: Scalars['String']['output'];
  editUser: User;
  onboardUser: AuthUser;
  requestResetPassword: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendMessage: Scalars['String']['output'];
  signIn: AuthInfo;
  signUp: AuthInfo;
  uploadEventImage?: Maybe<Scalars['String']['output']>;
  uploadGroupImage?: Maybe<Scalars['String']['output']>;
  verify: Scalars['String']['output'];
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateEventArgs = {
  event: EventInput;
  location: LocationInputWithoutCoords;
};

export type MutationCreateGroupArgs = {
  group: GroupInput;
  location: LocationInputWithoutCoords;
};

export type MutationCreateLocationArgs = {
  location: LocationInputWithoutCoords;
};

export type MutationDeleteEventArgs = {
  event_id: Scalars['Int']['input'];
  location_id: Scalars['Int']['input'];
};

export type MutationDeleteGroupArgs = {
  group_id: Scalars['Int']['input'];
  location_id: Scalars['Int']['input'];
};

export type MutationDeleteLocationArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationEditEventArgs = {
  event: EventInput;
  location: LocationInputWithoutCoords;
};

export type MutationEditGroupArgs = {
  group: GroupInput;
  location: LocationInputWithoutCoords;
};

export type MutationEditLocationArgs = {
  location: LocationInputWithoutCoords;
};

export type MutationEditReadThreadArgs = {
  read: Scalars['Boolean']['input'];
  threadId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationEditUserArgs = {
  location: LocationInputWithoutCoords;
  user: UserInput;
};

export type MutationOnboardUserArgs = {
  location: LocationInputWithoutCoords;
  user: UserInput;
};

export type MutationRequestResetPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSendMessageArgs = {
  recipient: RecipientInput;
  sender: SenderInput;
  text: Scalars['String']['input'];
};

export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationUploadEventImageArgs = {
  event_image?: InputMaybe<Scalars['Upload']['input']>;
};

export type MutationUploadGroupImageArgs = {
  group_image?: InputMaybe<Scalars['Upload']['input']>;
};

export type MutationVerifyArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  eventById?: Maybe<Event>;
  eventTypeById?: Maybe<EventType>;
  eventTypes: Array<EventType>;
  eventTypesByIds: Array<EventType>;
  events: Array<Event>;
  eventsByIds: Array<Event>;
  filterEvents?: Maybe<Array<Event>>;
  filterGroups: Array<Group>;
  groupById?: Maybe<Group>;
  groups: Array<Group>;
  groupsByIds: Array<Group>;
  interestingNearbyEvents: Array<Event>;
  interestingNearbyGroups: Array<Group>;
  locationById?: Maybe<Location>;
  locations: Array<Location>;
  locationsByIds: Array<Location>;
  messagesByThreadId: Array<Message>;
  nearbyGroups: Array<Group>;
  newlyCreatedNearbyEvents: Array<Event>;
  searchEvents: Array<Event>;
  similarEvents: Array<Event>;
  threads: Array<Thread>;
  todaysNearbyEvents: Array<Event>;
  userById?: Maybe<User>;
  users: Array<User>;
  usersByIds: Array<User>;
};

export type Query_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
};

export type QueryEventByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryEventTypeByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryEventTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEventTypesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEventsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryFilterEventsArgs = {
  end_datetime?: InputMaybe<Scalars['String']['input']>;
  eventTypeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  filterLocation?: InputMaybe<FilterLocationInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  start_datetime?: InputMaybe<Scalars['String']['input']>;
};

export type QueryFilterGroupsArgs = {
  eventTypeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  filterLocation?: InputMaybe<FilterLocationInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<GroupSortType>;
};

export type QueryGroupByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGroupsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryInterestingNearbyEventsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryInterestingNearbyGroupsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryLocationByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryLocationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryMessagesByThreadIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  threadId: Scalars['Int']['input'];
};

export type QueryNearbyGroupsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryNewlyCreatedNearbyEventsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySearchEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};

export type QuerySimilarEventsArgs = {
  city: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  eventTypeIds: Array<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryThreadsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryTodaysNearbyEventsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUsersByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type RecipientInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type SenderInput = {
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export enum SortType {
  Date = 'DATE',
  Distance = 'DISTANCE',
}

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['Int']['output'];
  lastMessage: Message;
  last_message_at?: Maybe<Scalars['String']['output']>;
  messages: Array<Message>;
  thread_read: Scalars['Boolean']['output'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  event_types: Array<EventType>;
  events: Array<Event>;
  first_name: Scalars['String']['output'];
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  location?: Maybe<Location>;
  location_id?: Maybe<Scalars['Int']['output']>;
  verified: Scalars['Boolean']['output'];
};

export type UserInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  event_type_ids: Array<Scalars['Int']['input']>;
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  last_name: Scalars['String']['input'];
  location_id?: InputMaybe<Scalars['Int']['input']>;
  verified: Scalars['Boolean']['input'];
};

export type OnboardUserMutationVariables = Exact<{
  user: UserInput;
  location: LocationInputWithoutCoords;
}>;

export type OnboardUserMutation = {
  __typename?: 'Mutation';
  onboardUser: {
    __typename?: 'AuthUser';
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    verified: boolean;
    location_id?: number | null;
    description?: string | null;
    password: string;
    location?: {
      __typename?: 'Location';
      id: number;
      country: string;
      city: string;
      street_name: string;
      street_number: string;
      latitude: number;
      longitude: number;
    } | null;
    event_types: Array<{ __typename?: 'EventType'; id: number; name: string; category: string }>;
  };
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'AuthInfo';
    token: string;
    user: {
      __typename?: 'AuthUser';
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      verified: boolean;
      location_id?: number | null;
      description?: string | null;
      location?: {
        __typename?: 'Location';
        id: number;
        country: string;
        city: string;
        street_name: string;
        street_number: string;
        latitude: number;
        longitude: number;
      } | null;
      event_types: Array<{ __typename?: 'EventType'; id: number; name: string; category: string }>;
    };
  };
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthInfo';
    token: string;
    user: { __typename?: 'AuthUser'; id: number; first_name: string; last_name: string; email: string };
  };
};

export type MutationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type MutationMutation = { __typename?: 'Mutation'; verify: string };

export type CreateEventMutationVariables = Exact<{
  event: EventInput;
  location: LocationInputWithoutCoords;
}>;

export type CreateEventMutation = { __typename?: 'Mutation'; createEvent: { __typename?: 'Event'; id: number } };

export type EditEventMutationVariables = Exact<{
  event: EventInput;
  location: LocationInputWithoutCoords;
}>;

export type EditEventMutation = { __typename?: 'Mutation'; editEvent: { __typename?: 'Event'; id: number } };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  locationId: Scalars['Int']['input'];
}>;

export type DeleteEventMutation = { __typename?: 'Mutation'; deleteEvent: string };

export type UploadEventImageMutationVariables = Exact<{
  eventImage?: InputMaybe<Scalars['Upload']['input']>;
}>;

export type UploadEventImageMutation = { __typename?: 'Mutation'; uploadEventImage?: string | null };

export type GetLocationAwareEventsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetLocationAwareEventsQuery = {
  __typename?: 'Query';
  todaysNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
  interestingNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
  newlyCreatedNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type EventsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type EventsQuery = {
  __typename?: 'Query';
  events: Array<{ __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }>;
};

export type TodaysNearbyEventsQueryVariables = Exact<{
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type TodaysNearbyEventsQuery = {
  __typename?: 'Query';
  todaysNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type InterestingNearbyEventsQueryVariables = Exact<{
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type InterestingNearbyEventsQuery = {
  __typename?: 'Query';
  interestingNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type NewlyCreatedNearbyEventsQueryVariables = Exact<{
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type NewlyCreatedNearbyEventsQuery = {
  __typename?: 'Query';
  newlyCreatedNearbyEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type QueryQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;

export type QueryQuery = {
  __typename?: 'Query';
  eventById?:
    | ({ __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } })
    | null;
};

export type FilterEventsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  eventTypeIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  startDatetime?: InputMaybe<Scalars['String']['input']>;
  endDatetime?: InputMaybe<Scalars['String']['input']>;
  filterLocation?: InputMaybe<FilterLocationInput>;
  sort?: InputMaybe<SortType>;
}>;

export type FilterEventsQuery = {
  __typename?: 'Query';
  filterEvents?: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  > | null;
};

export type SimilarEventsQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
  city: Scalars['String']['input'];
  eventTypeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;

export type SimilarEventsQuery = {
  __typename?: 'Query';
  similarEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type SearchEventsQueryVariables = Exact<{
  text: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchEventsQuery = {
  __typename?: 'Query';
  searchEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type GroupsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GroupsQuery = {
  __typename?: 'Query';
  groups: Array<{ __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }>;
};

export type GroupByIdQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;

export type GroupByIdQuery = {
  __typename?: 'Query';
  groupById?:
    | ({ __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } })
    | null;
};

export type FilterGroupsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  eventTypeIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  filterLocation?: InputMaybe<FilterLocationInput>;
  sort?: InputMaybe<GroupSortType>;
}>;

export type FilterGroupsQuery = {
  __typename?: 'Query';
  filterGroups: Array<
    { __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }
  >;
};

export type GetLocationAwareGroupsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  longitude: Scalars['Float']['input'];
  latitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetLocationAwareGroupsQuery = {
  __typename?: 'Query';
  nearbyGroups: Array<
    { __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }
  >;
  interestingNearbyGroups: Array<
    { __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }
  >;
};

export type EditReadThreadMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  threadId: Scalars['Int']['input'];
  read: Scalars['Boolean']['input'];
}>;

export type EditReadThreadMutation = { __typename?: 'Mutation'; editReadThread: string };

export type SendMessageMutationVariables = Exact<{
  sender: SenderInput;
  recipient: RecipientInput;
  text: Scalars['String']['input'];
}>;

export type SendMessageMutation = { __typename?: 'Mutation'; sendMessage: string };

export type ThreadsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type ThreadsQuery = {
  __typename?: 'Query';
  threads: Array<{ __typename?: 'Thread' } & { ' $fragmentRefs'?: { ThreadFragmentFragment: ThreadFragmentFragment } }>;
};

export type MessagesByThreadIdQueryVariables = Exact<{
  threadId: Scalars['Int']['input'];
}>;

export type MessagesByThreadIdQuery = {
  __typename?: 'Query';
  messagesByThreadId: Array<
    { __typename?: 'Message' } & { ' $fragmentRefs'?: { MessageFragmentFragment: MessageFragmentFragment } }
  >;
};

export type EventFragmentFragment = {
  __typename?: 'Event';
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  summary: string;
  description?: string | null;
  image_filepath?: string | null;
  capacity: number;
  allow_waitlist: boolean;
  event_types: Array<{ __typename?: 'EventType'; id: number; name: string }>;
  author:
    | {
        __typename: 'Group';
        id: number;
        name: string;
        admin: { __typename?: 'User'; id: number; first_name: string; last_name: string };
      }
    | { __typename: 'User'; id: number; first_name: string; last_name: string };
  location: {
    __typename?: 'Location';
    id: number;
    country: string;
    city: string;
    street_name: string;
    street_number: string;
    longitude: number;
    latitude: number;
  };
  participants: Array<{ __typename?: 'User'; id: number; first_name: string; last_name: string }>;
} & { ' $fragmentName'?: 'EventFragmentFragment' };

export type GroupFragmentFragment = {
  __typename?: 'Group';
  id: number;
  name: string;
  summary: string;
  description?: string | null;
  image_filepath?: string | null;
  admin: { __typename?: 'User'; id: number; first_name: string; last_name: string };
  event_types: Array<{ __typename?: 'EventType'; id: number; name: string }>;
  location: {
    __typename?: 'Location';
    id: number;
    country: string;
    city: string;
    street_name: string;
    street_number: string;
    longitude: number;
    latitude: number;
  };
  events: Array<{ __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }>;
  members: Array<{ __typename?: 'User'; id: number; first_name: string; last_name: string }>;
} & { ' $fragmentName'?: 'GroupFragmentFragment' };

export type MessageFragmentFragment = {
  __typename?: 'Message';
  id: number;
  thread_id: number;
  sender_id: number;
  text: string;
  sent_at: string;
  sender: { __typename?: 'User'; id: number; first_name: string; last_name: string };
} & { ' $fragmentName'?: 'MessageFragmentFragment' };

export type ThreadFragmentFragment = {
  __typename?: 'Thread';
  id: number;
  last_message_at?: string | null;
  thread_read: boolean;
  users: Array<{ __typename?: 'User'; id: number; first_name: string; last_name: string; email: string }>;
  lastMessage: { __typename?: 'Message' } & { ' $fragmentRefs'?: { MessageFragmentFragment: MessageFragmentFragment } };
  messages: Array<
    { __typename?: 'Message' } & { ' $fragmentRefs'?: { MessageFragmentFragment: MessageFragmentFragment } }
  >;
} & { ' $fragmentName'?: 'ThreadFragmentFragment' };

export const EventFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventFragmentFragment, unknown>;
export const GroupFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GroupFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupFragmentFragment, unknown>;
export const MessageFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sender_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent_at' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sender' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageFragmentFragment, unknown>;
export const ThreadFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ThreadFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Thread' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last_message_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_read' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lastMessage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messages' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sender_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent_at' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sender' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ThreadFragmentFragment, unknown>;
export const OnboardUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OnboardUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UserInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'LocationInputWithoutCoords' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onboardUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'user' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event_types' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OnboardUserMutation, OnboardUserMutationVariables>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'location_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'location' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'event_types' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first_name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last_name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last_name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last_name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const MutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Mutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verify' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const CreateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'event' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'EventInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'LocationInputWithoutCoords' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'event' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const EditEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'event' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'EventInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'LocationInputWithoutCoords' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'event' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditEventMutation, EditEventMutationVariables>;
export const DeleteEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'locationId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'location_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'locationId' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const UploadEventImageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UploadEventImage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadEventImage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event_image' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventImage' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadEventImageMutation, UploadEventImageMutationVariables>;
export const GetLocationAwareEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLocationAwareEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'todaysNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'interestingNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'newlyCreatedNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLocationAwareEventsQuery, GetLocationAwareEventsQueryVariables>;
export const EventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Events' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const TodaysNearbyEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TodaysNearbyEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'todaysNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodaysNearbyEventsQuery, TodaysNearbyEventsQueryVariables>;
export const InterestingNearbyEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InterestingNearbyEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'interestingNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InterestingNearbyEventsQuery, InterestingNearbyEventsQueryVariables>;
export const NewlyCreatedNearbyEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'NewlyCreatedNearbyEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'newlyCreatedNearbyEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewlyCreatedNearbyEventsQuery, NewlyCreatedNearbyEventsQueryVariables>;
export const QueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Query' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eventById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const FilterEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FilterEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'startDatetime' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'endDatetime' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filterLocation' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterLocationInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filterEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventTypeIds' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'start_datetime' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'startDatetime' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'end_datetime' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'endDatetime' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filterLocation' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filterLocation' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FilterEventsQuery, FilterEventsQueryVariables>;
export const SimilarEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SimilarEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'city' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'similarEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'city' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'city' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventTypeIds' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SimilarEventsQuery, SimilarEventsQueryVariables>;
export const SearchEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchEvents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchEventsQuery, SearchEventsQueryVariables>;
export const GroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Groups' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'groups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GroupFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupsQuery, GroupsQueryVariables>;
export const GroupByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GroupById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'groupById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GroupFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupByIdQuery, GroupByIdQueryVariables>;
export const FilterGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FilterGroups' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filterLocation' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FilterLocationInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GroupSortType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filterGroups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventTypeIds' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventTypeIds' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filterLocation' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filterLocation' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GroupFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FilterGroupsQuery, FilterGroupsQueryVariables>;
export const GetLocationAwareGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLocationAwareGroups' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'nearbyGroups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'interestingNearbyGroups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'longitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'longitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'latitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'latitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'author' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GroupFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Group' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'event_types' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street_number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image_filepath' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLocationAwareGroupsQuery, GetLocationAwareGroupsQueryVariables>;
export const EditReadThreadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditReadThread' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'read' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editReadThread' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'read' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'read' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditReadThreadMutation, EditReadThreadMutationVariables>;
export const SendMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendMessage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sender' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SenderInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'recipient' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'RecipientInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendMessage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sender' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sender' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'recipient' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'recipient' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const ThreadsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Threads' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'threads' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'ThreadFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sender_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent_at' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sender' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ThreadFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Thread' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last_message_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_read' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lastMessage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageFragment' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messages' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageFragment' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ThreadsQuery, ThreadsQueryVariables>;
export const MessagesByThreadIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MessagesByThreadId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'messagesByThreadId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'threadId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'threadId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thread_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sender_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sent_at' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sender' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessagesByThreadIdQuery, MessagesByThreadIdQueryVariables>;
