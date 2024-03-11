import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

export function useMetroBundlePlugin() {
  const client = useDevToolsPluginClient('metro-bundle-plugin');

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('ping', (data) => {
        alert(`Received ping from ${data.from}`);
      })
    );
    client?.sendMessage('ping', { from: 'app' });

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);
}
