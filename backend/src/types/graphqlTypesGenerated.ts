import { GraphQLResolveInfo } from 'graphql';
import { CustomContext } from './types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthInfo = {
  __typename?: 'AuthInfo';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  event_types: Array<EventType>;
  id: Scalars['Int']['output'];
  location?: Maybe<Location>;
  location_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type Event = {
  __typename?: 'Event';
  allow_waitlist: Scalars['Boolean']['output'];
  author: User;
  author_id?: Maybe<Scalars['Int']['output']>;
  capacity: Scalars['Int']['output'];
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_datetime: Scalars['String']['output'];
  event_types: Array<EventType>;
  group_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image_filePath?: Maybe<Scalars['String']['output']>;
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
  group_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_filePath?: InputMaybe<Scalars['String']['input']>;
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

export type Location = {
  __typename?: 'Location';
  additional_information?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  street_name: Scalars['String']['output'];
  street_number: Scalars['String']['output'];
};

export type LocationInput = {
  additional_information?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  street_name: Scalars['String']['input'];
  street_number: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createEvent: Event;
  createLocation?: Maybe<Location>;
  deleteEvent: Scalars['String']['output'];
  deleteLocation: Scalars['String']['output'];
  editEvent: Event;
  editLocation?: Maybe<Location>;
  requestResetPassword: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signIn: AuthInfo;
  signUp: AuthInfo;
  verify: Scalars['String']['output'];
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateEventArgs = {
  event: EventInput;
  location: LocationInput;
};

export type MutationCreateLocationArgs = {
  location: LocationInput;
};

export type MutationDeleteEventArgs = {
  event_id: Scalars['Int']['input'];
  location_id: Scalars['Int']['input'];
};

export type MutationDeleteLocationArgs = {
  id: Scalars['Int']['input'];
};

export type MutationEditEventArgs = {
  event: EventInput;
  location: LocationInput;
};

export type MutationEditLocationArgs = {
  location: LocationInput;
};

export type MutationRequestResetPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationVerifyArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  eventById?: Maybe<Event>;
  eventByIds: Array<Event>;
  eventTypeById?: Maybe<EventType>;
  eventTypes?: Maybe<Array<Maybe<EventType>>>;
  eventTypesByIds?: Maybe<Array<Maybe<EventType>>>;
  events: Array<Event>;
  interestingNearbyEvents: Array<Event>;
  locationById?: Maybe<Location>;
  locations?: Maybe<Array<Maybe<Location>>>;
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
  newlyCreatedNearbyEvents: Array<Event>;
  searchEvents: Array<Event>;
  similarEvents: Array<Event>;
  todaysNearbyEvents: Array<Event>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  usersByIds?: Maybe<Array<Maybe<User>>>;
};

export type Query_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
};

export type QueryEventByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryEventByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryEventTypeByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryEventTypesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryInterestingNearbyEventsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type QueryLocationByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
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

export type QueryTodaysNearbyEventsArgs = {
  latitude: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  longitude: Scalars['Float']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUsersByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  event_types: Array<EventType>;
  id: Scalars['Int']['output'];
  location?: Maybe<Location>;
  location_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthInfo: ResolverTypeWrapper<AuthInfo>;
  AuthUser: ResolverTypeWrapper<AuthUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Event: ResolverTypeWrapper<Event>;
  EventInput: EventInput;
  EventType: ResolverTypeWrapper<EventType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthInfo: AuthInfo;
  AuthUser: AuthUser;
  Boolean: Scalars['Boolean']['output'];
  Event: Event;
  EventInput: EventInput;
  EventType: EventType;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationInput: LocationInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
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
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  location_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event'],
> = {
  allow_waitlist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  author_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_datetime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  group_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type LocationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location'],
> = {
  additional_information?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  street_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  deleteLocation?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLocationArgs, 'id'>
  >;
  editEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    RequireFields<MutationEditEventArgs, 'event' | 'location'>
  >;
  editLocation?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditLocationArgs, 'location'>
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
    RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>
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
  eventByIds?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventByIdsArgs, 'ids'>
  >;
  eventTypeById?: Resolver<
    Maybe<ResolversTypes['EventType']>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTypeByIdArgs, 'id'>
  >;
  eventTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventType']>>>, ParentType, ContextType>;
  eventTypesByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EventType']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryEventTypesByIdsArgs, 'ids'>
  >;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  interestingNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryInterestingNearbyEventsArgs, 'latitude' | 'longitude' | 'userId'>
  >;
  locationById?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<QueryLocationByIdArgs, 'id'>
  >;
  locations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  locationsByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Location']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryLocationsByIdsArgs, 'ids'>
  >;
  newlyCreatedNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryNewlyCreatedNearbyEventsArgs, 'latitude' | 'longitude'>
  >;
  searchEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchEventsArgs, 'text'>
  >;
  similarEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QuerySimilarEventsArgs, 'city' | 'eventId' | 'eventTypeIds'>
  >;
  todaysNearbyEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryTodaysNearbyEventsArgs, 'latitude' | 'longitude'>
  >;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  usersByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersByIdsArgs, 'ids'>
  >;
};

export type UserResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  location_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  AuthInfo?: AuthInfoResolvers<ContextType>;
  AuthUser?: AuthUserResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventType?: EventTypeResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
