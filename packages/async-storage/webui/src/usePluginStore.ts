import type { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useCallback, useEffect, useState } from 'react';
import { Method, MethodAck } from '../../methods';

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

const methodAck: Record<Method, MethodAck> = {
  getAll: 'ack:getAll',
  set: 'ack:set',
  remove: 'ack:remove',
};

const promiseMap = new Map<string, Deferred<any>>();

export function usePluginStore(onError: (error: unknown) => void) {
  const client = useDevToolsPluginClient('async-storage');

  const [entries, setEntries] = useState<readonly KeyValuePair[]>([]);

  const update = useCallback(async () => {
    console.log('getAll', client?.connectionInfo);
    return client?.sendMessage('getAll', {});
  }, [client]);

  const set = useCallback(async (key: string, value: string) => {
    return client?.sendMessage('set', {
      key,
      value,
    });
  }, []);

  const remove = useCallback(async (key: string) => {
    return client?.sendMessage('remove', {
      key,
    });
  }, []);

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener(
        methodAck.getAll,
        ({ result }: { result: readonly KeyValuePair[] }) => {
          setEntries(result);
        }
      )
    );

    subscriptions.push(
      client?.addMessageListener(methodAck.set, () => {
        update();
      })
    );

    subscriptions.push(
      client?.addMessageListener(methodAck.remove, () => {
        update();
      })
    );

    subscriptions.push(
      client?.addMessageListener('error', ({ error }: { error: unknown }) => {
        onError(error);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  return {
    entries,
    update,
    set,
    remove,
  };
}
