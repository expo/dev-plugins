import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
import { Store } from '@reduxjs/toolkit';

/**
 * This hook registers a devtools plugin for Redux.
 *
 * @param store - The Redux store.
 */
export function useReduxDevTools(store: Store) {
  const client = useDevToolsPluginClient('redux');

  useEffect(() => {
    client?.sendMessage("storeUpdated", store.getState());
    const unsubscribeFn = store.subscribe(() => {
      const state = store.getState();
      client?.sendMessage("storeUpdated", state);
    });

    return () => {
      unsubscribeFn();
    }
  }, [client])
}