import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
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
};

export type LinkPreviewDto = {
  __typename?: 'LinkPreviewDto';
  description: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Month = {
  __typename?: 'Month';
  month?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findResources: Array<Resource>;
  getLinkPreview: LinkPreviewDto;
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

export type GetLinkPreviewQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetLinkPreviewQuery = { __typename?: 'Query', getLinkPreview: { __typename?: 'LinkPreviewDto', title: string, image: string, description: string, url: string } };

export type SkillProgressMonthsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillProgressMonthsQuery = { __typename?: 'Query', skillProgressMonths: Array<string> };

export type SkillProgressesQueryVariables = Exact<{
  fromYearMonth: Scalars['String'];
}>;


export type SkillProgressesQuery = { __typename?: 'Query', skillProgresses: Array<{ __typename?: 'SkillProgressDto', skillId: number, previousName: string, currentName: string, previousLevel?: number | null, currentLevel: number, levelImprovement: number }> };


export const GetLinkPreviewDocument = `
    query GetLinkPreview($url: String!) {
  getLinkPreview(url: $url) {
    title
    image
    description
    url
  }
}
    `;
export const useGetLinkPreviewQuery = <
      TData = GetLinkPreviewQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetLinkPreviewQueryVariables,
      options?: UseQueryOptions<GetLinkPreviewQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetLinkPreviewQuery, TError, TData>(
      ['GetLinkPreview', variables],
      fetcher<GetLinkPreviewQuery, GetLinkPreviewQueryVariables>(client, GetLinkPreviewDocument, variables, headers),
      options
    );
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