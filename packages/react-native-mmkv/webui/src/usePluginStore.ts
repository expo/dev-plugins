import { DevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useCallback, useEffect, useState } from 'react';

import { Method, MethodAck } from '../../methods';

const methodAck: Record<Method, MethodAck> = {
  getAll: 'ack:getAll',
  set: 'ack:set',
  remove: 'ack:remove',
};

type KeyType = string;
type ValueType = string;
type KeyValuePair = [KeyType, ValueType];

export function usePluginStore(client: DevToolsPluginClient, onError: (error: unknown) => void) {
  const [entries, setEntries] = useState<readonly { key: string; value: string | null }[]>([]);

  const update = useCallback(async () => {
    try {
      return client.sendMessage('getAll', {});
    } catch (e) {
      onError(e);
    }
  }, [client]);

  const set = useCallback(
    async (key: string, value: string) => {
      try {
        return client.sendMessage('set', {
          key,
          value,
        });
      } catch (e) {
        onError(e);
      }
    },
    [client]
  );

  const remove = useCallback(
    async (key: string) => {
      try {
        return client.sendMessage('remove', {
          key,
        });
      } catch (e) {
        onError(e);
      }
    },
    [client]
  );

  useEffect(() => {
    const subscriptions: (EventSubscription | undefined)[] = [];
    try {
      subscriptions.push(
        client.addMessageListener(
          methodAck.getAll,
          ({ result }: { result: readonly KeyValuePair[] }) => {
            setEntries(result.map(([key, value]) => ({ key, value })));
          }
        )
      );
    } catch (e) {
      onError(e);
    }

    try {
      subscriptions.push(
        client.addMessageListener(methodAck.set, () => {
          update();
        })
      );
    } catch (e) {
      onError(e);
    }

    try {
      subscriptions.push(
        client.addMessageListener(methodAck.remove, () => {
          update();
        })
      );
    } catch (e) {
      onError(e);
    }

    subscriptions.push(
      client.addMessageListener('error', ({ error }: { error: unknown }) => {
        onError(error);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        try {
          subscription?.remove();
        } catch (e) {
          onError(e);
        }
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
