import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CustomContext } from './types';
import type { FileUpload } from 'graphql-upload/Upload';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Upload: { input: Promise<FileUpload>; output: Promise<FileUpload> };
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
  reviewById?: Maybe<Review>;
  reviewsByUserId: Array<Review>;
  searchEvents: Array<Event>;
  searchGroups: Array<Group>;
  similarEvents: Array<Event>;
  similarGroups: Array<Group>;
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

export type QueryReviewByIdArgs = {
  reviewId: Scalars['Int']['input'];
};

export type QueryReviewsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  reviewer: User;
  reviewer_id: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  Author: Group | User;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthInfo: ResolverTypeWrapper<AuthInfo>;
  AuthUser: ResolverTypeWrapper<AuthUser>;
  Author: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Author']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Event: ResolverTypeWrapper<Omit<Event, 'author'> & { author: ResolversTypes['Author'] }>;
  EventInput: EventInput;
  EventType: ResolverTypeWrapper<EventType>;
  FilterLocationInput: FilterLocationInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Group: ResolverTypeWrapper<Group>;
  GroupInput: GroupInput;
  GroupSortType: GroupSortType;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  LocationInputWithoutCoords: LocationInputWithoutCoords;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RecipientInput: RecipientInput;
  Review: ResolverTypeWrapper<Review>;
  SenderInput: SenderInput;
  SortType: SortType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Thread: ResolverTypeWrapper<Thread>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthInfo: AuthInfo;
  AuthUser: AuthUser;
  Author: ResolversUnionTypes<ResolversParentTypes>['Author'];
  Boolean: Scalars['Boolean']['output'];
  Event: Omit<Event, 'author'> & { author: ResolversParentTypes['Author'] };
  EventInput: EventInput;
  EventType: EventType;
  FilterLocationInput: FilterLocationInput;
  Float: Scalars['Float']['output'];
  Group: Group;
  GroupInput: GroupInput;
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationInput: LocationInput;
  LocationInputWithoutCoords: LocationInputWithoutCoords;
  Message: Message;
  Mutation: {};
  Query: {};
  RecipientInput: RecipientInput;
  Review: Review;
  SenderInput: SenderInput;
  String: Scalars['String']['output'];
  Thread: Thread;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserInput: UserInput;
};

export type AuthInfoResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['AuthInfo'] = ResolversParentTypes['AuthInfo'],
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['AuthUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser'],
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  location_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author'],
> = {
  __resolveType: TypeResolveFn<'Group' | 'User', ParentType, ContextType>;
};

export type EventResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event'],
> = {
  allow_waitlist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  author_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_datetime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  group_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_filepath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  location_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  start_datetime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventTypeResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['EventType'] = ResolversParentTypes['EventType'],
> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group'],
> = {
  admin?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  admin_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_filepath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  location_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location'],
> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  street_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sender_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sent_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thread_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<Mutation_EmptyArgs>>;
  createEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventArgs, 'event' | 'location'>
  >;
  createGroup?: Resolver<
    ResolversTypes['Group'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupArgs, 'group' | 'location'>
  >;
  createLocation?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateLocationArgs, 'location'>
  >;
  deleteEvent?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEventArgs, 'event_id' | 'location_id'>
  >;
  deleteGroup?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGroupArgs, 'group_id' | 'location_id'>
  >;
  deleteLocation?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLocationArgs, 'id'>
  >;
  deleteUser?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  editEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    RequireFields<MutationEditEventArgs, 'event' | 'location'>
  >;
  editGroup?: Resolver<
    ResolversTypes['Group'],
    ParentType,
    ContextType,
    RequireFields<MutationEditGroupArgs, 'group' | 'location'>
  >;
  editLocation?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditLocationArgs, 'location'>
  >;
  editReadThread?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationEditReadThreadArgs, 'read' | 'threadId' | 'userId'>
  >;
  editUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationEditUserArgs, 'location' | 'user'>
  >;
  onboardUser?: Resolver<
    ResolversTypes['AuthUser'],
    ParentType,
    ContextType,
    RequireFields<MutationOnboardUserArgs, 'location' | 'user'>
  >;
  requestResetPassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRequestResetPasswordArgs, 'email'>
  >;
  resetPassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'password' | 'token'>
  >;
  sendMessage?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'recipient' | 'sender' | 'text'>
  >;
  signIn?: Resolver<
    ResolversTypes['AuthInfo'],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, 'email' | 'password'>
  >;
  signUp?: Resolver<
    ResolversTypes['AuthInfo'],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, 'email' | 'first_name' | 'last_name' | 'password'>
  >;
  uploadEventImage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<MutationUploadEventImageArgs>
  >;
  uploadGroupImage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    Partial<MutationUploadGroupImageArgs>
  >;
  verify?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVerifyArgs, 'token'>>;
};

export type QueryResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<Query_EmptyArgs>>;
  eventById?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventByIdArgs, 'id'>
  >;
  eventTypeById?: Resolver<
    Maybe<ResolversTypes['EventType']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTypeByIdArgs, 'id'>
  >;
  eventTypes?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType, Partial<QueryEventTypesArgs>>;
  eventTypesByIds?: Resolver<
    Array<ResolversTypes['EventType']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTypesByIdsArgs, 'ids'>
  >;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  eventsByIds?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventsByIdsArgs, 'ids'>
  >;
  filterEvents?: Resolver<
    Maybe<Array<ResolversTypes['Event']>>,
    ParentType,
    ContextType,
    Partial<QueryFilterEventsArgs>
  >;
  filterGroups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, Partial<QueryFilterGroupsArgs>>;
  groupById?: Resolver<
    Maybe<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupByIdArgs, 'id'>
  >;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, Partial<QueryGroupsArgs>>;
  groupsByIds?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsByIdsArgs, 'ids'>
  >;
  interestingNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryInterestingNearbyEventsArgs, 'latitude' | 'longitude' | 'userId'>
  >;
  interestingNearbyGroups?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QueryInterestingNearbyGroupsArgs, 'latitude' | 'longitude' | 'userId'>
  >;
  locationById?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<QueryLocationByIdArgs, 'id'>
  >;
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType, Partial<QueryLocationsArgs>>;
  locationsByIds?: Resolver<
    Array<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<QueryLocationsByIdsArgs, 'ids'>
  >;
  messagesByThreadId?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    RequireFields<QueryMessagesByThreadIdArgs, 'threadId'>
  >;
  nearbyGroups?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QueryNearbyGroupsArgs, 'latitude' | 'longitude'>
  >;
  newlyCreatedNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryNewlyCreatedNearbyEventsArgs, 'latitude' | 'longitude'>
  >;
  reviewById?: Resolver<
    Maybe<ResolversTypes['Review']>,
    ParentType,
    ContextType,
    RequireFields<QueryReviewByIdArgs, 'reviewId'>
  >;
  reviewsByUserId?: Resolver<
    Array<ResolversTypes['Review']>,
    ParentType,
    ContextType,
    RequireFields<QueryReviewsByUserIdArgs, 'userId'>
  >;
  searchEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchEventsArgs, 'text'>
  >;
  searchGroups?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchGroupsArgs, 'text'>
  >;
  similarEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QuerySimilarEventsArgs, 'city' | 'eventId' | 'eventTypeIds'>
  >;
  similarGroups?: Resolver<
    Array<ResolversTypes['Group']>,
    ParentType,
    ContextType,
    RequireFields<QuerySimilarGroupsArgs, 'city' | 'eventTypeIds' | 'groupId'>
  >;
  threads?: Resolver<
    Array<ResolversTypes['Thread']>,
    ParentType,
    ContextType,
    RequireFields<QueryThreadsArgs, 'userId'>
  >;
  todaysNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryTodaysNearbyEventsArgs, 'latitude' | 'longitude'>
  >;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  usersByIds?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersByIdsArgs, 'ids'>
  >;
};

export type ReviewResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  reviewer_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  last_message_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  thread_read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  average_rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  location_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  AuthInfo?: AuthInfoResolvers<ContextType>;
  AuthUser?: AuthUserResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventType?: EventTypeResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};
