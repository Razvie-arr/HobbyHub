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
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  author: User;
  description?: Maybe<Scalars['String']['output']>;
  end_datetime: Scalars['String']['output'];
  eventTypes: Array<EventType>;
  id: Scalars['Int']['output'];
  image_filePath?: Maybe<Scalars['String']['output']>;
  location: Location;
  name: Scalars['String']['output'];
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
  event?: Maybe<Event>;
  eventType?: Maybe<EventType>;
  eventTypes?: Maybe<Array<Maybe<EventType>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  location?: Maybe<Location>;
  locations?: Maybe<Array<Maybe<Location>>>;
};

export type QueryEventArgs = {
  id: Scalars['Int']['input'];
};

export type QueryEventTypeArgs = {
  id: Scalars['Int']['input'];
};

export type QueryLocationArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
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
    user: { __typename?: 'AuthUser'; id: number; name: string; email: string };
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

export type GetEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEventsQuery = {
  __typename?: 'Query';
  events?: Array<{
    __typename?: 'Event';
    id: number;
    name: string;
    start_datetime: string;
    end_datetime: string;
    summary: string;
    description?: string | null;
    image_filePath?: string | null;
    eventTypes: Array<{ __typename?: 'EventType'; id: number; name: string }>;
    author: { __typename?: 'User'; name: string };
    location: {
      __typename?: 'Location';
      country: string;
      city: string;
      street_name: string;
      street_number: string;
      longitude: number;
      latitude: number;
    };
  } | null> | null;
};

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
export const GetEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEvents' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_datetime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'end_datetime' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'eventTypes' },
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
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
