import type { NavigationContainerRef } from '@react-navigation/core';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect, useRef } from 'react';

import { ReduxExtensionAdapter } from './ReduxExtensionAdapter';

export function useReactNavigationDevTools(ref: React.RefObject<NavigationContainerRef<any>>) {
  const client = useDevToolsPluginClient('react-navigation');
  const adapterRef = useRef(new ReduxExtensionAdapter());
  // @ts-ignore: Override global
  globalThis.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect: () => adapterRef.current,
  };
  // @ts-expect-error
  useReduxDevToolsExtension(ref);

  useEffect(() => {
    adapterRef.current.setClient(client);

    const on = (event: string, listener: (params: any) => Promise<any>) => {
      return client?.addMessageListener(event, async (params) => {
        try {
          const result = await listener(params);

          if (params.id) {
            client?.sendMessage(`ack:${event}`, { id: params.id, result });
          }
        } catch {}
      });
    };

    const subscriptions: (EventSubscription | undefined)[] = [];
    subscriptions.push(
      on('navigation.invoke', ({ method, args = [] }) => {
        switch (method) {
          case 'resetRoot':
            return adapterRef.current?.resetRoot(args[0]);
          default:
            // @ts-ignore: this might not exist
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
  }, [client]);
}
