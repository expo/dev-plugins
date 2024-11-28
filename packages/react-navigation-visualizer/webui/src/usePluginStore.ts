import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { nanoid } from 'nanoid/non-secure';
import { useCallback, useEffect, useState } from 'react';

import type { Log, NavigationState } from './types';

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

const promiseMap = new Map<string, Deferred<any>>();

export function usePluginStore() {
  const client = useDevToolsPluginClient('react-navigation');
  const [logs, setLogs] = useState<Log[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('init', () => {
        setLogs([]);
        setIndex(null);
      })
    );

    subscriptions.push(
      client?.addMessageListener('action', (action) => {
        setLogs((value) => {
          const currentLogs = index !== null ? value.slice(0, index + 1) : value;
          return [...currentLogs, action];
        });
        setIndex(null);
      })
    );

    subscriptions.push(
      client?.addMessageListener('ack:linking.invoke', ({ id, result }) => {
        const deferred = promiseMap.get(id);
        if (deferred) {
          deferred.resolve(result);
          promiseMap.delete(id);
        }
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client, index]);

  const navigation = useCallback(
    async (method: string, ...args: any[]) => {
      await client?.sendMessage('navigation.invoke', { method, args });
    },
    [client]
  );

  const resetTo = useCallback(
    async (id: string) => {
      const indexValue = logs.findIndex((update) => update.id === id)!;
      const { state } = logs[indexValue];
      setIndex(indexValue);
      await client?.sendMessage('navigation.invoke', {
        method: 'resetRoot',
        args: [state],
      });
    },
    [client, logs]
  );

  const linking = useCallback(
    async (method: string, ...args: any[]) => {
      const id = nanoid();
      const deferred = createDeferred();
      promiseMap.set(id, deferred);
      await client?.sendMessage('linking.invoke', { method, args, id });
      return deferred.promise;
    },
    [client]
  );

  return {
    logs,
    index: index ?? logs.length - 1,
    resetTo,
    navigation,
    linking,
  };
}

function createDeferred<T>(): Deferred<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}
