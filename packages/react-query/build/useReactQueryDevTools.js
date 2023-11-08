import { stringify } from 'flatted';
import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
export function useReactQueryDevTools(queryClient) {
    const client = useDevToolsPluginClient('react-query');
    const queryCache = queryClient.getQueryCache();
    let unsubscribe;
    function getQueries() {
        return queryCache.getAll();
    }
    function getQueryByHash(queryHash) {
        return getQueries().find((query) => query.queryHash === queryHash);
    }
    function getSerializedQueries() {
        const queries = getQueries().map((query) => serializeQuery(query));
        const serializedQueries = {
            queries: stringify(queries),
        };
        return serializedQueries;
    }
    useEffect(() => {
        const subscriptions = [];
        subscriptions.push(client?.addMessageListener('queryRefetch', ({ queryHash }) => {
            getQueryByHash(queryHash)?.fetch();
        }));
        subscriptions.push(client?.addMessageListener('queryRemove', ({ queryHash }) => {
            const query = getQueryByHash(queryHash);
            if (query) {
                queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
            }
        }));
        // send initial queries
        client?.sendMessage('queries', getSerializedQueries());
        /**
         * handles QueryCacheNotifyEvent
         * @param event - QueryCacheNotifyEvent, but RQ doesn't have it exported
         */
        const handleCacheEvent = (event) => {
            const { query } = event;
            client?.sendMessage('queryCacheEvent', {
                cacheEvent: stringify({ ...event, query: serializeQuery(query) }),
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
function serializeQuery(query) {
    return {
        ...query,
        _ext_isActive: query.isActive(),
        _ext_isStale: query.isStale(),
        _ext_observersCount: query.getObserversCount(),
    };
}
//# sourceMappingURL=useReactQueryDevTools.js.map