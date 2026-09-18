import type { ObservableQuery } from '@apollo/client';

// A minimal duck-typed shape instead of `ApolloClient<NormalizedCacheObject>`:
// the `ApolloClient` class generic was removed in v4, so any type referencing
// it directly can only compile against one major version at a time.
export interface ApolloClientType {
  cache: {
    extract(optimistic?: boolean): object;
  };
  getObservableQueries(): Map<string, ObservableQuery> | Set<ObservableQuery>;
  __actionHookForDevTools(cb: () => void): void;
}

export type Variables = ObservableQuery['variables'];

export type QueryData = {
  id: string;
  queryString: string;
  variables: Variables;
  cachedData: unknown;
  name: string | undefined;
};

export type MutationData = {
  id: string;
  name: string | null;
  variables: object;
  loading: boolean;
  error: object;
  body: string | undefined;
};

export type Callback = () => any;

export type ArrayOfQuery = QueryData[];
export type ArrayOfMutations = MutationData[];

export type ApolloClientState = {
  id: number;
  lastUpdateAt: string;
  queries: ArrayOfQuery;
  mutations: ArrayOfMutations;
  cache: object;
};
