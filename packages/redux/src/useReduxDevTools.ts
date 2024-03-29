import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
import { Store } from '@reduxjs/toolkit';

/**
 * This hook registers a devtools plugin for Redux.
 *
 * @param store - The Redux store.
 */

let lastAction = null;
export function useReduxDevTools(store: Store) {
  const client = useDevToolsPluginClient('redux');

  useEffect(() => {
    client?.sendMessage('storeUpdated', { store: store.getState(), lastAction });

    const unsubscribeFn = store.subscribe(() => {
      const state = store.getState();
      client?.sendMessage('storeUpdated', state);
    });

    return () => {
      unsubscribeFn();
    };
  }, [client, lastAction]);
}

export const reduxDevToolsMiddleware = (store) => (next) => (action) => {
  if (action !== lastAction) {
    lastAction = { ...action, time: new Date().toISOString() };
  }
  const result = next(action);
  return result;
};
