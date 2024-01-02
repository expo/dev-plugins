import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
export function useAsyncStorageDevTools() {
    const client = useDevToolsPluginClient('async-storage');
    useEffect(() => {
        console.log(client?.connectionInfo);
    }, [client]);
    useEffect(() => {
        const on = (event, listener) => {
            client?.addMessageListener(event, async (params) => {
                try {
                    const result = await listener(params);
                    client?.sendMessage(`ack:${event}`, { result });
                }
                catch (error) {
                    try {
                        client?.sendMessage('error', { error });
                    }
                    catch { }
                }
            });
        };
        const subscriptions = [];
        subscriptions.push(on('getAll', async () => {
            const keys = await AsyncStorage.getAllKeys();
            return await AsyncStorage.multiGet(keys);
        }));
        subscriptions.push(on('set', ({ key, value }) => {
            console.log('set', { key, value });
            if (key !== undefined && value !== undefined)
                return AsyncStorage.setItem(key, value);
            else
                return Promise.resolve();
        }));
        subscriptions.push(on('remove', ({ key }) => {
            if (key !== undefined)
                return AsyncStorage.removeItem(key);
            else
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