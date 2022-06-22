import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Learning = {
  __typename?: 'Learning';
  createdAt: Scalars['DateTime'];
  datetime: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  isHighlight: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Float'];
};

export type LearningInput = {
  datetime: Scalars['String'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['Float']>;
  isHighlight: Scalars['Boolean'];
};

export type LinkPreviewDto = {
  __typename?: 'LinkPreviewDto';
  alreadySavedResource?: Maybe<Resource>;
  description: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  youtubeVideoLength: Scalars['String'];
};

export type Month = {
  __typename?: 'Month';
  month?: Maybe<Scalars['String']>;
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
  skillProgressMonths: Array<Scalars['String']>;
  skillProgresses: Array<SkillProgressDto>;
};


export type QueryFindResourcesArgs = {
  userId?: InputMaybe<Scalars['Float']>;
};


export type QueryGetLinkPreviewArgs = {
  url: Scalars['String'];
};


export type QuerySkillProgressesArgs = {
  fromYearMonth: Scalars['String'];
};

export type Resource = {
  __typename?: 'Resource';
  completedAt: Scalars['String'];
  createdAt: Scalars['String'];
  dueDate: Scalars['String'];
  estimatedTime: Scalars['String'];
  id: Scalars['Float'];
  position?: Maybe<Scalars['Float']>;
  privateNote: Scalars['String'];
  publicReview: Scalars['String'];
  rating?: Maybe<Scalars['Float']>;
  tagId?: Maybe<Scalars['Float']>;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  userId: Scalars['Float'];
};

export type SkillProgressDto = {
  __typename?: 'SkillProgressDto';
  currentLevel: Scalars['Float'];
  currentName: Scalars['String'];
  levelImprovement: Scalars['Float'];
  previousLevel?: Maybe<Scalars['Float']>;
  previousName: Scalars['String'];
  skillId: Scalars['Float'];
};

export type SkillProgressMonthsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillProgressMonthsQuery = { __typename?: 'Query', skillProgressMonths: Array<string> };

export type AddLearningMutationVariables = Exact<{
  input: LearningInput;
}>;


export type AddLearningMutation = { __typename?: 'Mutation', addLearning: { __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, datetime: any } };

export type UpdateLearningMutationVariables = Exact<{
  input: LearningInput;
}>;


export type UpdateLearningMutation = { __typename?: 'Mutation', updateLearning: { __typename?: 'Learning', id: number, userId: number, description: string, isHighlight: boolean, datetime: any, createdAt: any, updatedAt: any } };

export type SkillProgressesQueryVariables = Exact<{
  fromYearMonth: Scalars['String'];
}>;


export type SkillProgressesQuery = { __typename?: 'Query', skillProgresses: Array<{ __typename?: 'SkillProgressDto', skillId: number, previousName: string, currentName: string, previousLevel?: number | null, currentLevel: number, levelImprovement: number }> };

export type LinkPreviewQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type LinkPreviewQuery = { __typename?: 'Query', getLinkPreview: { __typename?: 'LinkPreviewDto', title: string, image: string, description: string, url: string, youtubeVideoLength: string, alreadySavedResource?: { __typename?: 'Resource', id: number, userId: number, title: string, url: string, thumbnail: string, estimatedTime: string, dueDate: string, rating?: number | null, completedAt: string, position?: number | null, publicReview: string, privateNote: string, createdAt: string, updatedAt: string, tagId?: number | null } | null } };

export type LearningsQueryVariables = Exact<{ [key: string]: never; }>;


export type LearningsQuery = { __typename?: 'Query', learnings: Array<{ __typename?: 'Learning', id: number, description: string, isHighlight: boolean, datetime: any, createdAt: any, updatedAt: any }> };


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
    id
    userId
    description
    isHighlight
    datetime
  }
}
    `;
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
    id
    userId
    description
    isHighlight
    datetime
    createdAt
    updatedAt
  }
}
    `;
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
    id
    description
    isHighlight
    datetime
    createdAt
    updatedAt
  }
}
    `;
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