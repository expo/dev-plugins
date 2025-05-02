import type { ApolloClient, NormalizedCacheObject, ObservableQuery } from '@apollo/client';
import type { QueryInfo } from '@apollo/client/core/QueryInfo';
import type { ASTNode } from 'graphql';
export type ApolloClientType = ApolloClient<NormalizedCacheObject>;
export type Variables = QueryInfo['variables'];
export type RawQueryData = {
    document: ASTNode;
    variables: Variables;
    observableQuery: ObservableQuery;
    lastDiff: any;
    diff: any;
    queryId: string;
};
export type QueryData = {
    id: string;
    queryString: string;
    variables: Variables;
    cachedData: string;
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
//# sourceMappingURL=types.d.ts.map