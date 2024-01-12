import type { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { App } from 'antd';
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

  const { message, notification } = App.useApp();

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    let interval = setInterval(() => {
      if (client?.isConnected()) {
        if (interval != null) {
          clearInterval(interval);
          interval = null;
        }
        setConnected(true);
      }
    }, 1000);
    return () => { if (interval != null) { clearInterval(interval); interval = null; } };
  }, [client]);

  const [entries, setEntries] = useState<readonly { key: string; value: string | null }[]>([]);

  const update = useCallback(async () => {
    if (!client?.isConnected()) {
      message.error('Not connected to host');
      return;
    }
    try {
      return client?.sendMessage('getAll', {});
    } catch (e) {
      onError(e);
    }
  }, [client]);

  const set = useCallback(
    async (key: string, value: string) => {
      if (!client?.isConnected()) {
        message.error('Not connected to host');
        return;
      }
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
      if (!client?.isConnected()) {
        message.error('Not connected to host');
        return;
      }
      try {
        return client?.sendMessage('remove', {
          key,
        });
      } catch (e) {
        onError(e);
      }
    },
    [client]
  );

  useEffect(() => {
    if (!client?.isConnected()) {
      notification.error({
        message: 'Critical error:\nNot connected to host - please reload the page',
      });
      return;
    }

    const subscriptions: EventSubscription[] = [];

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
    ready: connected,
  };
}
