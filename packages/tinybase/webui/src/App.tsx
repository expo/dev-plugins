import { useEffect } from 'react';
import { createStore } from 'tinybase/debug';
import { Provider } from 'tinybase/debug/ui-react';
import { StoreInspector } from 'tinybase/debug/ui-react-dom';

import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';

const store = createStore();

let __ignoreStoreUpdates = false;

export default function App() {
  const client = useDevToolsPluginClient('tinybase');

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

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
      <StoreInspector open position="full" />
    </Provider>
  );
}
