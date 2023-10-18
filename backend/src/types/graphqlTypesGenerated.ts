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
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  author: User;
  author_id: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_datetime: Scalars['String']['output'];
  event_types: Array<EventType>;
  id: Scalars['Int']['output'];
  image_filePath?: Maybe<Scalars['String']['output']>;
  location: Location;
  location_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participants: Array<User>;
  start_datetime: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type EventType = {
  __typename?: 'EventType';
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

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  signIn: AuthInfo;
  signUp: AuthInfo;
};

export type Mutation_EmptyArgs = {
  nothing?: InputMaybe<Scalars['String']['input']>;
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

export type Query = {
  __typename?: 'Query';
  getEventById?: Maybe<Event>;
  getEventByIds?: Maybe<Array<Maybe<Event>>>;
  getEventTypeById?: Maybe<EventType>;
  getEventTypes?: Maybe<Array<Maybe<EventType>>>;
  getEventTypesByIds?: Maybe<Array<Maybe<EventType>>>;
  getEvents?: Maybe<Array<Maybe<Event>>>;
  getLocationById?: Maybe<Location>;
  getLocations?: Maybe<Array<Maybe<Location>>>;
  getLocationsByIds?: Maybe<Array<Maybe<Location>>>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getUsersByIds?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetEventByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEventByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryGetEventTypeByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEventTypesByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryGetLocationByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetLocationsByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetUsersByIdsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
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
  EventType: ResolverTypeWrapper<EventType>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
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
  EventType: EventType;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
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
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event'],
> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  author_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_datetime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event_types?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
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
};

export type QueryResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getEventById?: Resolver<
    Maybe<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEventByIdArgs, 'id'>
  >;
  getEventByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Event']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEventByIdsArgs, 'ids'>
  >;
  getEventTypeById?: Resolver<
    Maybe<ResolversTypes['EventType']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEventTypeByIdArgs, 'id'>
  >;
  getEventTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventType']>>>, ParentType, ContextType>;
  getEventTypesByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EventType']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEventTypesByIdsArgs, 'ids'>
  >;
  getEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  getLocationById?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLocationByIdArgs, 'id'>
  >;
  getLocations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Location']>>>, ParentType, ContextType>;
  getLocationsByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Location']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLocationsByIdsArgs, 'ids'>
  >;
  getUserById?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByIdArgs, 'id'>
  >;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getUsersByIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUsersByIdsArgs, 'ids'>
  >;
};

export type UserResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
