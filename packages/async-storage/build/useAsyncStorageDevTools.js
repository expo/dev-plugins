import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
export function useAsyncStorageDevTools() {
    const client = useDevToolsPluginClient('react-navigation');
    useEffect(() => {
        const on = (event, listener) => {
            client?.addMessageListener(event, async (params) => {
                try {
                    const result = await listener(params);
                    if (params.id) {
                        client?.sendMessage(`ack:${event}`, { id: params.id, result });
                    }
                }
                catch { }
            });
        };
        const subscriptions = [];
        subscriptions.push(on('hello', () => {
            console.log("olleh");
            return Promise.resolve();
        }));
        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client]);
}
//# sourceMappingURL=useAsyncStorageDevTools.js.map