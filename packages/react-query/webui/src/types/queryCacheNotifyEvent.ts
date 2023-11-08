import type { Query, QueryKey, QueryObserver } from '@tanstack/react-query';
import type { Action } from '@tanstack/query-core/src/query';

// Copies from RQ https://github.com/tannerlinsley/react-query/blob/c989bde9e13a59a58428ea6dde9d958251cc09d5/src/core/queryCache.ts#L25
// TODO: Remove this once RQ has exported this types
export interface NotifyEventQueryAdded {
  type: 'queryAdded';
  query: Query<any, any, any, any>;
}

interface NotifyEventQueryRemoved {
  type: 'queryRemoved';
  query: Query<any, any, any, any>;
}

interface NotifyEventQueryUpdated {
  type: 'queryUpdated';
  query: Query<any, any, any, any>;
  action: Action<any, any>;
}

interface NotifyEventObserverAdded {
  type: 'observerAdded';
  query: Query<any, any, any, any>;
  observer: QueryObserver<any, any, any, any, any>;
}

interface NotifyEventObserverRemoved {
  type: 'observerRemoved';
  query: Query<any, any, any, any>;
  observer: QueryObserver<any, any, any, any, any>;
}

interface NotifyEventObserverResultsUpdated {
  type: 'observerResultsUpdated';
  query: Query<any, any, any, any>;
}

export type QueryCacheNotifyEvent =
  | NotifyEventQueryAdded
  | NotifyEventQueryRemoved
  | NotifyEventQueryUpdated
  | NotifyEventObserverAdded
  | NotifyEventObserverRemoved
  | NotifyEventObserverResultsUpdated;
