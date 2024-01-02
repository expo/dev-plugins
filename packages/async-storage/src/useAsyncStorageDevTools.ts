import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';
import { Method } from '../methods';

export function useAsyncStorageDevTools() {
  const client = useDevToolsPluginClient('react-navigation');

  useEffect(() => {
    const on = (event: Method, listener: (params: any) => Promise<any>) => {
      client?.addMessageListener(event, async (params) => {
        try {
          const result = await listener(params);

          client?.sendMessage(`ack:${event}`, { result });
        } catch {}
      });
    };

    const subscriptions: EventSubscription[] = [];
    subscriptions.push(
      on('getAll', async () => {
        const keys = await AsyncStorage.getAllKeys();
        return await AsyncStorage.multiGet(keys);
      })
    );

    subscriptions.push(
      on('set', ({ key, value }) => {
        return AsyncStorage.setItem(key, value);
      })
    );

    subscriptions.push(
      on('remove', ({ key }) => {
        return AsyncStorage.removeItem(key);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);
}
