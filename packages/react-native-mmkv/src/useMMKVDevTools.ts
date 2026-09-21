import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useCallback, useEffect, useMemo } from 'react';
import { createMMKV, type MMKV } from 'react-native-mmkv';

import { Method } from '../methods';

type Params = {
  errorHandler?: (error: Error) => void;
  storage?: MMKV;
};

export function useMMKVDevTools({
  errorHandler,
  storage: storageProp,
}: Params = {}) {
  const client = useDevToolsPluginClient('mmkv');

  // Ensure we create MMKV only once if not provided
  const storage = useMemo(() => storageProp ?? createMMKV(), [storageProp]);

  const handleError = useCallback(
    (error: unknown) => {
      const err = error instanceof Error ? error : new Error(String(error));
      errorHandler?.(err);
    },
    [errorHandler]
  );

  useEffect(() => {
    if (!client) return;

    const on = (
      event: Method,
      listener: (params: { key?: string; value?: string }) => Promise<any>
    ): EventSubscription =>
      client.addMessageListener(event, async (params: { key?: string; value?: string }) => {
        try {
          const result = await listener(params);
          client.sendMessage(`ack:${event}`, { result: result ?? true });
        } catch (error) {
          // send a serializable error payload
          const err = error instanceof Error ? { message: error.message, stack: error.stack } : { message: String(error) };
          try {
            client.sendMessage('error', err);
          } finally {
            handleError(error);
          }
        }
      });

    const subscriptions: EventSubscription[] = [];

    // getAll
    subscriptions.push(
      on('getAll', async () => {
        const keys = storage.getAllKeys() ?? [];
        // Try to read strings; fall back to number/bool if not string
        return keys.map((key) => {
          const s = storage.getString(key);
          if (s !== undefined) return [key, s];

          const n = storage.getNumber?.(key);
          if (typeof n === 'number' && !Number.isNaN(n)) return [key, String(n)];

          const b = storage.getBoolean?.(key);
          if (typeof b === 'boolean') return [key, String(b)];

          return [key, undefined];
        });
      })
    );

    // set
    subscriptions.push(
      on('set', async ({ key, value }) => {
        if (key !== undefined && value !== undefined) {
          storage.set(key, value);
          return true;
        }
        return false;
      })
    );

    // remove
    subscriptions.push(
      on('remove', async ({ key }) => {
        if (key !== undefined) {
          storage.remove(key);
          return true;
        }
        return false;
      })
    );

    return () => {
      for (const sub of subscriptions) {
        try {
          sub.remove();
        } catch (e) {
          handleError(e);
        }
      }
    };
  }, [client, storage, handleError]);
}
