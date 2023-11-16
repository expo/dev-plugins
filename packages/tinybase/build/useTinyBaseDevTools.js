import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
export function useTinyBaseDevTools(store) {
    const client = useDevToolsPluginClient('tinybase');
    useEffect(() => {
        const subscriptions = [];
        /* Sync the full store on init */
        client?.sendMessage('@tinybase-inspector/init', store.getJson());
        subscriptions.push(client?.addMessageListener('@tinybase-inspector/edit', (data) => {
            store.setJson(data);
        }));
        const listenerId = store.addDidFinishTransactionListener(() => {
            client?.sendMessage('@tinybase-inspector/update', store.getJson());
        });
        return () => {
            store.delListener(listenerId);
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client, store]);
}
//# sourceMappingURL=useTinyBaseDevTools.js.map