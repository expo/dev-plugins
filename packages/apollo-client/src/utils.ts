import { print } from 'graphql';

import type { ArrayOfQuery, RawQueryData } from './types';

export function getQueries(queryMap: Map<string, RawQueryData>): ArrayOfQuery {
  const queries: ArrayOfQuery = [];

  if (queryMap) {
    [...queryMap.values()].forEach(
      ({ document, variables, observableQuery, diff, lastDiff }, queryId) => {
        if (document && observableQuery) {
          queries.push({
            queryString: print(document),
            variables,
            cachedData: diff?.result || lastDiff?.diff?.result,
            name: observableQuery?.queryName,
            id: queryId?.toString(),
          });
        }
      }
    );
  }
  return queries;
}
