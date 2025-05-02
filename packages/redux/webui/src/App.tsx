import { App } from 'antd';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { Fragment, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

export default function Main() {
  const client = useDevToolsPluginClient('redux');
  const [storeHistory, setStoreHistory] = useState<any[]>([]);

  useEffect(() => {
    const subscriptions: (EventSubscription | undefined)[] = [];

    subscriptions.push(
      client?.addMessageListener('storeUpdated', (data) => {
        setStoreHistory((prevHistory) => [...prevHistory, data]);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  return (
    <App style={{ width: '100%', height: '100%', padding: '0.75em', overflowY: 'scroll' }}>
      {storeHistory.map((history, index) => {
        return (
          <Fragment key={index}>
            <ReactJson src={history} />
          </Fragment>
        );
      })}
    </App>
  );
}
