import type { NavigationContainerRef } from '@react-navigation/core';
import { nanoid } from 'nanoid/non-secure';
import useDevToolsBase from '@react-navigation/devtools/lib/module/useDevToolsBase';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

export function useReactNavigationDevTools(ref: React.RefObject<NavigationContainerRef<any>>) {
  const client = useDevToolsPluginClient('react-navigation');

  const { resetRoot } = useDevToolsBase(ref, (result) => {
    switch (result.type) {
      case 'init':
        client?.sendMessage('init', {
          id: nanoid(),
          state: result.state,
        });
        break;
      case 'action':
        client?.sendMessage('action', {
          id: nanoid(),
          action: result.action,
          state: result.state,
          stack: result.stack,
        });
        break;
    }
  });

  useEffect(() => {
    const on = (event: string, listener: (params: any) => Promise<any>) => {
      client?.addMessageListener(event, async (params) => {
        try {
          const result = await listener(params);

          if (params.id) {
            client?.sendMessage(`ack:${event}`, { id: params.id, result });
          }
        } catch {}
      });
    };

    const subscriptions: EventSubscription[] = [];
    subscriptions.push(
      on('navigation.invoke', ({ method, args = [] }) => {
        switch (method) {
          case 'resetRoot':
            return resetRoot(args[0]);
          default:
            return ref.current?.[method](...args);
        }
      })
    );

    subscriptions.push(
      on('linking.invoke', ({ method, args = [] }) => {
        const linking: any = ref.current
          ? // @ts-ignore: this might not exist
            global.REACT_NAVIGATION_DEVTOOLS?.get(ref.current)?.linking
          : null;

        switch (method) {
          case 'getStateFromPath':
          case 'getPathFromState':
          case 'getActionFromState':
            return linking?.[method](
              args[0],
              args[1]?.trim()
                ? // eslint-disable-next-line no-eval
                  eval(`(function() { return ${args[1]}; }())`)
                : linking.config
            );
          default:
            return linking?.[method](...args);
        }
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client, ref, resetRoot]);
}
