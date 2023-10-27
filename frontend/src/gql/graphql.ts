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
      name: string;
      email: string;
      event_types: Array<{ __typename?: 'EventType'; id: number; name: string; category: string }>;
      location?: { __typename?: 'Location'; longitude: number; latitude: number } | null;
    };
  };
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthInfo';
    token: string;
    user: { __typename?: 'AuthUser'; id: number; name: string; email: string };
  };
};

export type MutationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type MutationMutation = { __typename?: 'Mutation'; verify: string };

export type EventFragmentFragment = {
  __typename?: 'Event';
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  summary: string;
  description?: string | null;
  image_filePath?: string | null;
  capacity: number;
  allow_waitlist: boolean;
  event_types: Array<{ __typename?: 'EventType'; id: number; name: string }>;
  author: { __typename?: 'User'; id: number; name: string };
  location: {
    __typename?: 'Location';
    country: string;
    city: string;
    street_name: string;
    street_number: string;
    longitude: number;
    latitude: number;
  };
  participants: Array<{ __typename?: 'User'; id: number; name: string }>;
} & { ' $fragmentName'?: 'EventFragmentFragment' };

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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
  ],
} as unknown as DocumentNode<EventFragmentFragment, unknown>;
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
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
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
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
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
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
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
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'image_filePath' } },
          { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allow_waitlist' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'participants' },
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
  ],
} as unknown as DocumentNode<NewlyCreatedNearbyEventsQuery, NewlyCreatedNearbyEventsQueryVariables>;
