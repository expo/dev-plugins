import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useCallback, useEffect } from 'react';
import { Method } from '../methods';

/**
 * This hook registers a devtools plugin for AsyncStorage.
 *
 * The plugin provides you with the ability to view, add, edit, and remove AsyncStorage entries.
 *
 * @param props
 * @param props.errorHandler - A function that will be called with any errors that occur while communicating
 * with the devtools, if not provided errors will be ignored. Setting this is highly recommended.
 */
export function useAsyncStorageDevTools({
  errorHandler,
}: {
  errorHandler?: (error: Error) => void;
} = {}) {
  const client = useDevToolsPluginClient('async-storage');

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        errorHandler?.(error);
      } else {
        errorHandler?.(new Error(`Unknown error: ${String(error)}`));
      }
    },
    [errorHandler]
  );

  useEffect(() => {
    const on = (
      event: Method,
      listener: (params: { key?: string; value?: string }) => Promise<any>
    ) =>
      client?.addMessageListener(event, async (params: { key?: string; value?: string }) => {
        try {
          const result = await listener(params);

          client?.sendMessage(`ack:${event}`, { result });
        } catch (error) {
          try {
            client?.sendMessage('error', { error });
            handleError(error);
          } catch (e) {
            handleError(e);
          }
        }
      });

    const subscriptions: EventSubscription[] = [];

    try {
      subscriptions.push(
        on('getAll', async () => {
          const keys = await AsyncStorage.getAllKeys();
          return await AsyncStorage.multiGet(keys);
        })
      );
    } catch (e) {
      handleError(e);
    }

    try {
      subscriptions.push(
        on('set', ({ key, value }) => {
          if (key !== undefined && value !== undefined) return AsyncStorage.setItem(key, value);
          else return Promise.resolve();
        })
      );
    } catch (e) {
      handleError(e);
    }

    try {
      subscriptions.push(
        on('remove', ({ key }) => {
          if (key !== undefined) return AsyncStorage.removeItem(key);
          else return Promise.resolve();
        })
      );
    } catch (e) {
      handleError(e);
    }

    return () => {
      for (const subscription of subscriptions) {
        try {
          subscription?.remove();
        } catch (e) {
          handleError(e);
        }
      }
    };
  }, [client]);
}
