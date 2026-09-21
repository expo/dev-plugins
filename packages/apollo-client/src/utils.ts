import type { ObservableQuery } from '@apollo/client';
import { print } from 'graphql';
import type { DocumentNode } from 'graphql';

import type { ArrayOfQuery } from './types';

// Inlined instead of imported, to stay independent of the Apollo Client version.
export function getOperationName(document: DocumentNode): string | null {
  for (const definition of document.definitions) {
    if (definition.kind === 'OperationDefinition' && definition.name) {
      return definition.name.value;
    }
  }
  return null;
}

// `ObservableQuery.queryId` does not exist in Apollo Client v4.
const fallbackQueryIds = new WeakMap<ObservableQuery, string>();
let nextFallbackQueryId = 0;

function getQueryId(observableQuery: ObservableQuery & { queryId?: string }): string {
  if (observableQuery.queryId) {
    return observableQuery.queryId;
  }
  let id = fallbackQueryIds.get(observableQuery);
  if (!id) {
    id = `q${nextFallbackQueryId++}`;
    fallbackQueryIds.set(observableQuery, id);
  }
  return id;
}

export function getObservableQueriesList(
  observableQueries: Map<string, ObservableQuery> | Set<ObservableQuery>
): ObservableQuery[] {
  return observableQueries instanceof Map
    ? [...observableQueries.values()]
    : [...observableQueries];
}

export function getQueries(observableQueries: ObservableQuery[]): ArrayOfQuery {
  return observableQueries.map((observableQuery) => {
    const { data } = observableQuery.getCurrentResult();
    return {
      queryString: print(observableQuery.query),
      variables: observableQuery.variables,
      cachedData: data,
      name: observableQuery.queryName,
      id: getQueryId(observableQuery),
    };
  });
}
