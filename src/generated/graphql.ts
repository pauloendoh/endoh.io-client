import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type Learning = {
  __typename?: 'Learning';
  createdAt: Scalars['DateTime']['output'];
  datetime: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  isHighlight: Scalars['Boolean']['output'];
  points: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Float']['output'];
};

export type LearningInput = {
  datetime: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  isHighlight: Scalars['Boolean']['input'];
  points: Scalars['Float']['input'];
};

export type LinkPreviewDto = {
  __typename?: 'LinkPreviewDto';
  alreadySavedResource?: Maybe<Resource>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  viewCount?: Maybe<Scalars['Float']['output']>;
  youtubeVideoLength?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLearning: Learning;
  updateLearning: Learning;
};


export type MutationAddLearningArgs = {
  input: LearningInput;
};


export type MutationUpdateLearningArgs = {
  input: LearningInput;
};

export type Query = {
  __typename?: 'Query';
  findResources: Array<Resource>;
  getLinkPreview: LinkPreviewDto;
  learnings: Array<Learning>;
  skillProgressMonths: Array<Scalars['String']['output']>;
  skillProgresses: Array<SkillProgressDto>;
};


export type QueryFindResourcesArgs = {
  userId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetLinkPreviewArgs = {
  url: Scalars['String']['input'];
};


export type QuerySkillProgressesArgs = {
  fromYearMonth: Scalars['String']['input'];
};

export type Resource = {
  __typename?: 'Resource';
  completedAt: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dueDate: Scalars['String']['output'];
  estimatedTime: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  position?: Maybe<Scalars['Float']['output']>;
  privateNote: Scalars['String']['output'];
  publicReview: Scalars['String']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  tagId?: Maybe<Scalars['Float']['output']>;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
};

export type SkillProgressDto = {
  __typename?: 'SkillProgressDto';
  currentLevel: Scalars['Float']['output'];
  currentName: Scalars['String']['output'];
  levelImprovement: Scalars['Float']['output'];
  previousLevel?: Maybe<Scalars['Float']['output']>;
  previousName: Scalars['String']['output'];
  skillId: Scalars['Float']['output'];
};

export type SkillProgressMonthsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillProgressMonthsQuery = { __typename?: 'Query', skillProgressMonths: Array<string> };

export type AddLearningMutationVariables = Exact<{
  input: LearningInput;
}>;


export type AddLearningMutation = { __typename?: 'Mutation', addLearning: { __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, points: number, datetime: string, createdAt: string, updatedAt: string } };

export type UpdateLearningMutationVariables = Exact<{
  input: LearningInput;
}>;


export type UpdateLearningMutation = { __typename?: 'Mutation', updateLearning: { __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, points: number, datetime: string, createdAt: string, updatedAt: string } };

export type AMutationVariables = Exact<{
  input: LearningInput;
}>;


export type AMutation = { __typename?: 'Mutation', addLearning: { __typename?: 'Learning', id: number } };

export type SkillProgressesQueryVariables = Exact<{
  fromYearMonth: Scalars['String']['input'];
}>;


export type SkillProgressesQuery = { __typename?: 'Query', skillProgresses: Array<{ __typename?: 'SkillProgressDto', skillId: number, previousName: string, currentName: string, previousLevel?: number | null, currentLevel: number, levelImprovement: number }> };

export type LinkPreviewQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type LinkPreviewQuery = { __typename?: 'Query', getLinkPreview: { __typename?: 'LinkPreviewDto', title?: string | null, image?: string | null, description?: string | null, url?: string | null, youtubeVideoLength?: string | null, viewCount?: number | null, alreadySavedResource?: { __typename?: 'Resource', id: number, userId: number, title: string, url: string, thumbnail: string, estimatedTime: string, dueDate: string, rating?: number | null, completedAt: string, position?: number | null, publicReview: string, privateNote: string, createdAt: string, updatedAt: string, tagId?: number | null } | null } };

export type LearningsQueryVariables = Exact<{ [key: string]: never; }>;


export type LearningsQuery = { __typename?: 'Query', learnings: Array<{ __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, points: number, datetime: string, createdAt: string, updatedAt: string }> };

export type LearningFragment = { __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, points: number, datetime: string, createdAt: string, updatedAt: string };

export const LearningFragmentDoc = `
    fragment Learning on Learning {
  id
  userId
  description
  isHighlight
  points
  datetime
  createdAt
  updatedAt
}
    `;
export const SkillProgressMonthsDocument = `
    query SkillProgressMonths {
  skillProgressMonths
}
    `;
export const useSkillProgressMonthsQuery = <
      TData = SkillProgressMonthsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SkillProgressMonthsQueryVariables,
      options?: UseQueryOptions<SkillProgressMonthsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SkillProgressMonthsQuery, TError, TData>(
      variables === undefined ? ['SkillProgressMonths'] : ['SkillProgressMonths', variables],
      fetcher<SkillProgressMonthsQuery, SkillProgressMonthsQueryVariables>(client, SkillProgressMonthsDocument, variables, headers),
      options
    );

useSkillProgressMonthsQuery.getKey = (variables?: SkillProgressMonthsQueryVariables) => variables === undefined ? ['SkillProgressMonths'] : ['SkillProgressMonths', variables];
;

useSkillProgressMonthsQuery.fetcher = (client: GraphQLClient, variables?: SkillProgressMonthsQueryVariables, headers?: RequestInit['headers']) => fetcher<SkillProgressMonthsQuery, SkillProgressMonthsQueryVariables>(client, SkillProgressMonthsDocument, variables, headers);
export const AddLearningDocument = `
    mutation AddLearning($input: LearningInput!) {
  addLearning(input: $input) {
    ...Learning
  }
}
    ${LearningFragmentDoc}`;
export const useAddLearningMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddLearningMutation, TError, AddLearningMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddLearningMutation, TError, AddLearningMutationVariables, TContext>(
      ['AddLearning'],
      (variables?: AddLearningMutationVariables) => fetcher<AddLearningMutation, AddLearningMutationVariables>(client, AddLearningDocument, variables, headers)(),
      options
    );
useAddLearningMutation.fetcher = (client: GraphQLClient, variables: AddLearningMutationVariables, headers?: RequestInit['headers']) => fetcher<AddLearningMutation, AddLearningMutationVariables>(client, AddLearningDocument, variables, headers);
export const UpdateLearningDocument = `
    mutation UpdateLearning($input: LearningInput!) {
  updateLearning(input: $input) {
    ...Learning
  }
}
    ${LearningFragmentDoc}`;
export const useUpdateLearningMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateLearningMutation, TError, UpdateLearningMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateLearningMutation, TError, UpdateLearningMutationVariables, TContext>(
      ['UpdateLearning'],
      (variables?: UpdateLearningMutationVariables) => fetcher<UpdateLearningMutation, UpdateLearningMutationVariables>(client, UpdateLearningDocument, variables, headers)(),
      options
    );
useUpdateLearningMutation.fetcher = (client: GraphQLClient, variables: UpdateLearningMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdateLearningMutation, UpdateLearningMutationVariables>(client, UpdateLearningDocument, variables, headers);
export const ADocument = `
    mutation A($input: LearningInput!) {
  addLearning(input: $input) {
    id
  }
}
    `;
export const useAMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AMutation, TError, AMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AMutation, TError, AMutationVariables, TContext>(
      ['A'],
      (variables?: AMutationVariables) => fetcher<AMutation, AMutationVariables>(client, ADocument, variables, headers)(),
      options
    );
useAMutation.fetcher = (client: GraphQLClient, variables: AMutationVariables, headers?: RequestInit['headers']) => fetcher<AMutation, AMutationVariables>(client, ADocument, variables, headers);
export const SkillProgressesDocument = `
    query SkillProgresses($fromYearMonth: String!) {
  skillProgresses(fromYearMonth: $fromYearMonth) {
    skillId
    previousName
    currentName
    previousLevel
    currentLevel
    levelImprovement
  }
}
    `;
export const useSkillProgressesQuery = <
      TData = SkillProgressesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SkillProgressesQueryVariables,
      options?: UseQueryOptions<SkillProgressesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SkillProgressesQuery, TError, TData>(
      ['SkillProgresses', variables],
      fetcher<SkillProgressesQuery, SkillProgressesQueryVariables>(client, SkillProgressesDocument, variables, headers),
      options
    );

useSkillProgressesQuery.getKey = (variables: SkillProgressesQueryVariables) => ['SkillProgresses', variables];
;

useSkillProgressesQuery.fetcher = (client: GraphQLClient, variables: SkillProgressesQueryVariables, headers?: RequestInit['headers']) => fetcher<SkillProgressesQuery, SkillProgressesQueryVariables>(client, SkillProgressesDocument, variables, headers);
export const LinkPreviewDocument = `
    query LinkPreview($url: String!) {
  getLinkPreview(url: $url) {
    title
    image
    description
    url
    youtubeVideoLength
    viewCount
    alreadySavedResource {
      id
      userId
      title
      url
      thumbnail
      estimatedTime
      dueDate
      rating
      completedAt
      position
      publicReview
      privateNote
      createdAt
      updatedAt
      tagId
    }
  }
}
    `;
export const useLinkPreviewQuery = <
      TData = LinkPreviewQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: LinkPreviewQueryVariables,
      options?: UseQueryOptions<LinkPreviewQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LinkPreviewQuery, TError, TData>(
      ['LinkPreview', variables],
      fetcher<LinkPreviewQuery, LinkPreviewQueryVariables>(client, LinkPreviewDocument, variables, headers),
      options
    );

useLinkPreviewQuery.getKey = (variables: LinkPreviewQueryVariables) => ['LinkPreview', variables];
;

useLinkPreviewQuery.fetcher = (client: GraphQLClient, variables: LinkPreviewQueryVariables, headers?: RequestInit['headers']) => fetcher<LinkPreviewQuery, LinkPreviewQueryVariables>(client, LinkPreviewDocument, variables, headers);
export const LearningsDocument = `
    query Learnings {
  learnings {
    ...Learning
  }
}
    ${LearningFragmentDoc}`;
export const useLearningsQuery = <
      TData = LearningsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LearningsQueryVariables,
      options?: UseQueryOptions<LearningsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LearningsQuery, TError, TData>(
      variables === undefined ? ['Learnings'] : ['Learnings', variables],
      fetcher<LearningsQuery, LearningsQueryVariables>(client, LearningsDocument, variables, headers),
      options
    );

useLearningsQuery.getKey = (variables?: LearningsQueryVariables) => variables === undefined ? ['Learnings'] : ['Learnings', variables];
;

useLearningsQuery.fetcher = (client: GraphQLClient, variables?: LearningsQueryVariables, headers?: RequestInit['headers']) => fetcher<LearningsQuery, LearningsQueryVariables>(client, LearningsDocument, variables, headers);