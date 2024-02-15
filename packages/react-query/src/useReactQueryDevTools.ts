import { stringify } from 'flatted';
import type { Query, QueryCacheNotifyEvent, QueryClient } from '@tanstack/react-query';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

const bigintReplacer = (_, v) => (typeof v === 'bigint' ? v.toString() : v);

export function useReactQueryDevTools(queryClient: QueryClient) {
  const client = useDevToolsPluginClient('react-query');
  const queryCache = queryClient.getQueryCache();

  let unsubscribe: (() => void) | undefined;

  function getQueries() {
    return queryCache.getAll();
  }

  function getQueryByHash(queryHash: string): Query | undefined {
    return getQueries().find((query) => query.queryHash === queryHash);
  }

  function getSerializedQueries() {
    const queries = getQueries().map((query) => serializeQuery(query));

    const serializedQueries = {
      queries: stringify(queries, bigintReplacer),
    };

    return serializedQueries;
  }

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('queryRefetch', ({ queryHash }) => {
        getQueryByHash(queryHash)?.fetch();
      })
    );

    subscriptions.push(
      client?.addMessageListener('queryRemove', ({ queryHash }) => {
        const query = getQueryByHash(queryHash);
        if (query) {
          queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
        }
      })
    );

    // send initial queries
    client?.sendMessage('queries', getSerializedQueries());

    /**
     * handles QueryCacheNotifyEvent
     * @param event - QueryCacheNotifyEvent, but RQ doesn't have it exported
     */
    const handleCacheEvent = (event: QueryCacheNotifyEvent) => {
      const { query } = event;
      client?.sendMessage('queryCacheEvent', {
        cacheEvent: stringify({ ...event, query: serializeQuery(query) }, bigintReplacer),
      });
    };

    // Subscribe to QueryCacheNotifyEvent and send updates only
    unsubscribe = queryCache.subscribe(handleCacheEvent);

    return () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
      }
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);
}

function serializeQuery(query: Query) {
  return {
    ...query,
    _ext_isActive: query.isActive(),
    _ext_isStale: query.isStale(),
    _ext_observersCount: query.getObserversCount(),
  };
}
