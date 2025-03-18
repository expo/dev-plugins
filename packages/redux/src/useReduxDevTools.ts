import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
import { Store } from '@reduxjs/toolkit';
import SuperJson from 'superjson';
/**
 * This hook registers a devtools plugin for Redux.
 *
 * @param store - The Redux store.
 */
export function useReduxDevTools(store: Store) {
  const client = useDevToolsPluginClient('redux');

  useEffect(() => {
    client?.sendMessage('storeUpdated', SuperJson.stringify(store.getState()));
    const unsubscribeFn = store.subscribe(() => {
      const state = store.getState();
      client?.sendMessage('storeUpdated', SuperJson.stringify(state));
    });

    return () => {
      unsubscribeFn();
    }
  }, [client])
}