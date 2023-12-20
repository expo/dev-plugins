import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

export function <%= project.hookName %>() {
  const client = useDevToolsPluginClient('<%- project.name %>');

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
