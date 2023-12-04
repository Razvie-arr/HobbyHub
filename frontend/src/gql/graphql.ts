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
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  location?: Maybe<Location>;
  location_id?: Maybe<Scalars['Int']['output']>;
  password: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type AuthUserInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  event_type_ids: Array<Scalars['Int']['input']>;
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  last_name: Scalars['String']['input'];
  location_id?: InputMaybe<Scalars['Int']['input']>;
  password: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
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
  feedback_request_sent: Scalars['Boolean']['output'];
  group_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image_filepath?: Maybe<Scalars['String']['output']>;
  location: Location;
  location_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participants: Array<ParticipantType>;
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
  askForFeedback: Array<Scalars['String']['output']>;
  createEvent: Event;
  createGroup: Group;
  createLocation?: Maybe<Location>;
  createReview: Review;
  deleteEvent: Scalars['String']['output'];
  deleteGroup: Scalars['String']['output'];
  deleteLocation: Scalars['String']['output'];
  deleteUser: Scalars['String']['output'];
  editAuthUser: AuthUser;
  editEvent: Event;
  editGroup: Group;
  editLocation?: Maybe<Location>;
  editReadThread: Scalars['String']['output'];
  editUser: User;
  maxRatingAllParticipants: Scalars['Boolean']['output'];
  onboardUser: AuthUser;
  requestEventRegistration: Scalars['String']['output'];
  requestResetPassword: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  resolveEventRegistration: Scalars['String']['output'];
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

export type MutationCreateReviewArgs = {
  eventId: Scalars['Int']['input'];
  rating: Scalars['Float']['input'];
  reviewerId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
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

export type MutationEditAuthUserArgs = {
  location: LocationInputWithoutCoords;
  user: AuthUserInput;
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

export type MutationMaxRatingAllParticipantsArgs = {
  adminId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
};

export type MutationOnboardUserArgs = {
  location: LocationInputWithoutCoords;
  user: UserInput;
};

export type MutationRequestEventRegistrationArgs = {
  eventRegistration: RequestEventRegistrationInput;
};

export type MutationRequestResetPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationResolveEventRegistrationArgs = {
  resolve: ResolveEventRegistrationInput;
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

export enum ParticipantState {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
}

export type ParticipantType = {
  __typename?: 'ParticipantType';
  state: ParticipantState;
  text?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  authUserById?: Maybe<AuthUser>;
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
  reviewById?: Maybe<Review>;
  reviewsByUserId: Array<Review>;
  reviewsCount: Scalars['Int']['output'];
  searchEvents: Array<Event>;
  searchGroups: Array<Group>;
  similarEvents: Array<Event>;
  similarGroups: Array<Group>;
  threads: Array<Thread>;
  todaysNearbyEvents: Array<Event>;
  unreviewedEventParticipants: Array<User>;
  userAdminGroups: Array<Group>;
  userById?: Maybe<User>;
  userCreatedEvents: Array<Event>;
  users: Array<User>;
  usersByIds: Array<User>;
};

export type Query_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
};

export type QueryAuthUserByIdArgs = {
  id: Scalars['Int']['input'];
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

export type QueryReviewByIdArgs = {
  reviewId: Scalars['Int']['input'];
};

export type QueryReviewsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryReviewsCountArgs = {
  userId: Scalars['Int']['input'];
};

export type QuerySearchEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};

export type QuerySearchGroupsArgs = {
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

export type QuerySimilarGroupsArgs = {
  city: Scalars['String']['input'];
  eventTypeIds: Array<Scalars['Int']['input']>;
  groupId: Scalars['Int']['input'];
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

export type QueryUnreviewedEventParticipantsArgs = {
  eventId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type QueryUserAdminGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserCreatedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
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

export type RequestEventRegistrationInput = {
  author_id?: InputMaybe<Scalars['Int']['input']>;
  event_id: Scalars['Int']['input'];
  event_name: Scalars['String']['input'];
  group_id?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
  user_email: Scalars['String']['input'];
  user_id: Scalars['Int']['input'];
  user_name: Scalars['String']['input'];
};

export type ResolveEventRegistrationInput = {
  event_id: Scalars['Int']['input'];
  event_name: Scalars['String']['input'];
  resolution: Scalars['Boolean']['input'];
  user_email: Scalars['String']['input'];
  user_id: Scalars['Int']['input'];
};

export type Review = {
  __typename?: 'Review';
  event: Event;
  event_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  reviewer: User;
  reviewer_id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  user: User;
  user_id: Scalars['Int']['output'];
};

export type SenderInput = {
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export enum SortType {
  DateCreated = 'DATE_CREATED',
  DateStart = 'DATE_START',
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
  average_rating: Scalars['Float']['output'];
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
      groups: Array<{ __typename?: 'Group'; id: number; name: string }>;
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

export type RequestEventRegistrationMutationVariables = Exact<{
  eventRegistration: RequestEventRegistrationInput;
}>;

export type RequestEventRegistrationMutation = { __typename?: 'Mutation'; requestEventRegistration: string };

export type ResolveEventRegistrationMutationVariables = Exact<{
  resolve: ResolveEventRegistrationInput;
}>;

export type ResolveEventRegistrationMutation = { __typename?: 'Mutation'; resolveEventRegistration: string };

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

export type EventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;

export type EventQuery = {
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

export type CreateGroupMutationVariables = Exact<{
  group: GroupInput;
  location: LocationInputWithoutCoords;
}>;

export type CreateGroupMutation = { __typename?: 'Mutation'; createGroup: { __typename?: 'Group'; id: number } };

export type EditGroupMutationVariables = Exact<{
  group: GroupInput;
  location: LocationInputWithoutCoords;
}>;

export type EditGroupMutation = { __typename?: 'Mutation'; editGroup: { __typename?: 'Group'; id: number } };

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars['Int']['input'];
  locationId: Scalars['Int']['input'];
}>;

export type DeleteGroupMutation = { __typename?: 'Mutation'; deleteGroup: string };

export type UploadGroupImageMutationVariables = Exact<{
  groupImage?: InputMaybe<Scalars['Upload']['input']>;
}>;

export type UploadGroupImageMutation = { __typename?: 'Mutation'; uploadGroupImage?: string | null };

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

export type SimilarGroupsQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
  city: Scalars['String']['input'];
  eventTypeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;

export type SimilarGroupsQuery = {
  __typename?: 'Query';
  similarGroups: Array<
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

export type EditUserMutationVariables = Exact<{
  user: UserInput;
  location: LocationInputWithoutCoords;
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  editUser: {
    __typename?: 'User';
    id: number;
    event_types: Array<{ __typename?: 'EventType'; id: number; category: string; name: string }>;
  };
};

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type UserProfileQuery = {
  __typename?: 'Query';
  userById?: {
    __typename?: 'User';
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    description?: string | null;
    average_rating: number;
    event_types: Array<{ __typename?: 'EventType'; id: number; name: string; category: string }>;
    location?:
      | ({ __typename?: 'Location' } & { ' $fragmentRefs'?: { LocationFragmentFragment: LocationFragmentFragment } })
      | null;
  } | null;
};

export type UserCreatedEventsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type UserCreatedEventsQuery = {
  __typename?: 'Query';
  userCreatedEvents: Array<
    { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }
  >;
};

export type UserAdminGroupsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type UserAdminGroupsQuery = {
  __typename?: 'Query';
  userAdminGroups: Array<
    { __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }
  >;
};

export type ReviewsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ReviewsByUserIdQuery = {
  __typename?: 'Query';
  reviewsByUserId: Array<{
    __typename?: 'Review';
    id: number;
    text: string;
    rating: number;
    reviewer: { __typename?: 'User'; first_name: string; email: string; id: number; last_name: string };
    event: { __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } };
  }>;
};

export type CreateReviewMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  reviewerId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
}>;

export type CreateReviewMutation = { __typename?: 'Mutation'; createReview: { __typename?: 'Review'; id: number } };

export type MaxRatingAllParticipantsMutationVariables = Exact<{
  adminId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
}>;

export type MaxRatingAllParticipantsMutation = { __typename?: 'Mutation'; maxRatingAllParticipants: boolean };

export type UnreviewedEventParticipantsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  eventId: Scalars['Int']['input'];
}>;

export type UnreviewedEventParticipantsQuery = {
  __typename?: 'Query';
  unreviewedEventParticipants: Array<{
    __typename?: 'User';
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }>;
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

export type SearchGroupsQueryVariables = Exact<{
  text: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchGroupsQuery = {
  __typename?: 'Query';
  searchGroups: Array<
    { __typename?: 'Group' } & { ' $fragmentRefs'?: { GroupFragmentFragment: GroupFragmentFragment } }
  >;
};

export type EventFragmentFragment = {
  __typename?: 'Event';
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  author_id?: number | null;
  group_id?: number | null;
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
        admin: { __typename?: 'User'; id: number; first_name: string; last_name: string; email: string };
      }
    | { __typename: 'User'; id: number; first_name: string; last_name: string; email: string };
  location: { __typename?: 'Location' } & { ' $fragmentRefs'?: { LocationFragmentFragment: LocationFragmentFragment } };
  participants: Array<{
    __typename?: 'ParticipantType';
    state: ParticipantState;
    text?: string | null;
    user: { __typename?: 'User'; id: number; first_name: string; last_name: string; email: string };
  }>;
} & { ' $fragmentName'?: 'EventFragmentFragment' };

export type GroupFragmentFragment = {
  __typename?: 'Group';
  id: number;
  name: string;
  summary: string;
  description?: string | null;
  image_filepath?: string | null;
  admin: { __typename?: 'User'; id: number; first_name: string; last_name: string; email: string };
  event_types: Array<{ __typename?: 'EventType'; id: number; name: string }>;
  location: { __typename?: 'Location' } & { ' $fragmentRefs'?: { LocationFragmentFragment: LocationFragmentFragment } };
  events: Array<{ __typename?: 'Event' } & { ' $fragmentRefs'?: { EventFragmentFragment: EventFragmentFragment } }>;
  members: Array<{ __typename?: 'User'; id: number; first_name: string; last_name: string; email: string }>;
} & { ' $fragmentName'?: 'GroupFragmentFragment' };

export type LocationFragmentFragment = {
  __typename?: 'Location';
  id: number;
  country: string;
  city: string;
  street_name: string;
  street_number: string;
  longitude: number;
  latitude: number;
} & { ' $fragmentName'?: 'LocationFragmentFragment' };

export type MessageFragmentFragment = {
  __typename?: 'Message';
  id: number;
  thread_id: number;
  sender_id: number;
  text: string;
  sent_at: string;
  sender: { __typename?: 'User'; id: number; first_name: string; last_name: string; email: string };
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

export const LocationFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
  ],
} as unknown as DocumentNode<LocationFragmentFragment, unknown>;
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'groups' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
export const RequestEventRegistrationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestEventRegistration' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventRegistration' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RequestEventRegistrationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestEventRegistration' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventRegistration' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventRegistration' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestEventRegistrationMutation, RequestEventRegistrationMutationVariables>;
export const ResolveEventRegistrationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResolveEventRegistration' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resolve' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ResolveEventRegistrationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resolveEventRegistration' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resolve' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resolve' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResolveEventRegistrationMutation, ResolveEventRegistrationMutationVariables>;
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewlyCreatedNearbyEventsQuery, NewlyCreatedNearbyEventsQueryVariables>;
export const EventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Event' },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EventQuery, EventQueryVariables>;
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SimilarEventsQuery, SimilarEventsQueryVariables>;
export const CreateGroupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateGroup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'GroupInput' } } },
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
            name: { kind: 'Name', value: 'createGroup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
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
} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const EditGroupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditGroup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'GroupInput' } } },
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
            name: { kind: 'Name', value: 'editGroup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
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
} as unknown as DocumentNode<EditGroupMutation, EditGroupMutationVariables>;
export const DeleteGroupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteGroup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
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
            name: { kind: 'Name', value: 'deleteGroup' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
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
} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const UploadGroupImageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UploadGroupImage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupImage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'uploadGroupImage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group_image' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'groupImage' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UploadGroupImageMutation, UploadGroupImageMutationVariables>;
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
export const SimilarGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SimilarGroups' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
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
            name: { kind: 'Name', value: 'similarGroups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'groupId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'groupId' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
} as unknown as DocumentNode<SimilarGroupsQuery, SimilarGroupsQueryVariables>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessagesByThreadIdQuery, MessagesByThreadIdQueryVariables>;
export const EditUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditUser' },
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
            name: { kind: 'Name', value: 'editUser' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event_types' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const UserProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserProfile' },
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
            name: { kind: 'Name', value: 'userById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'average_rating' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'location' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
  ],
} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UserCreatedEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserCreatedEvents' },
      variableDefinitions: [
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
            name: { kind: 'Name', value: 'userCreatedEvents' },
            arguments: [
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCreatedEventsQuery, UserCreatedEventsQueryVariables>;
export const UserAdminGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserAdminGroups' },
      variableDefinitions: [
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
            name: { kind: 'Name', value: 'userAdminGroups' },
            arguments: [
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
} as unknown as DocumentNode<UserAdminGroupsQuery, UserAdminGroupsQueryVariables>;
export const ReviewsByUserIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ReviewsByUserId' },
      variableDefinitions: [
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
            name: { kind: 'Name', value: 'reviewsByUserId' },
            arguments: [
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
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reviewer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'EventFragment' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>;
export const CreateReviewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateReview' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'reviewerId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rating' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReview' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reviewerId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'reviewerId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'text' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rating' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'rating' } },
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
} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const MaxRatingAllParticipantsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MaxRatingAllParticipants' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'adminId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
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
            name: { kind: 'Name', value: 'maxRatingAllParticipants' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'adminId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'adminId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MaxRatingAllParticipantsMutation, MaxRatingAllParticipantsMutationVariables>;
export const UnreviewedEventParticipantsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UnreviewedEventParticipants' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
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
            name: { kind: 'Name', value: 'unreviewedEventParticipants' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eventId' } },
              },
            ],
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnreviewedEventParticipantsQuery, UnreviewedEventParticipantsQueryVariables>;
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
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchEventsQuery, SearchEventsQueryVariables>;
export const SearchGroupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchGroups' },
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
            name: { kind: 'Name', value: 'searchGroups' },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'GroupFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'LocationFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'author_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'group_id' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'LocationFragment' } }],
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
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
} as unknown as DocumentNode<SearchGroupsQuery, SearchGroupsQueryVariables>;
