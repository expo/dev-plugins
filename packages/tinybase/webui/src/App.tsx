import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';
import { createStore } from 'tinybase';
import { Provider } from 'tinybase/ui-react';
import { Inspector } from 'tinybase/ui-react-inspector';

const store = createStore();

let __ignoreStoreUpdates = false;

export default function App() {
  const client = useDevToolsPluginClient('tinybase');

  useEffect(() => {
    const subscriptions: (EventSubscription | undefined)[] = [];

    subscriptions.push(
      client?.addMessageListener('@tinybase-inspector/init', (data) => {
        __ignoreStoreUpdates = true;
        store.setJson(data);
        __ignoreStoreUpdates = false;
      })
    );

    subscriptions.push(
      client?.addMessageListener('@tinybase-inspector/update', (data) => {
        __ignoreStoreUpdates = true;
        store.setJson(data);
        __ignoreStoreUpdates = false;
      })
    );

    const listenerId = store.addDidFinishTransactionListener(() => {
      if (__ignoreStoreUpdates) {
        return;
      }
      client?.sendMessage('@tinybase-inspector/edit', store.getJson());
    });

    return () => {
      store.delListener(listenerId);
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client, store]);

  if (client == null) {
    return null;
  }

  return (
    <Provider store={store}>
      <Inspector open position="full" />
    </Provider>
  );
}
