import { App } from 'antd';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { Fragment, useEffect, useState } from 'react';
import JsonView from '@uiw/react-json-view';
import SuperJson from 'superjson';

export default function Main() {
  const client = useDevToolsPluginClient('redux');
  const [storeHistory, setStoreHistory] = useState<any[]>([])

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];
  
    subscriptions.push(
      client?.addMessageListener('storeUpdated', (data) => {
        setStoreHistory((prevHistory) => [...prevHistory, SuperJson.parse(data)]);
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
            <JsonView value={history} />
          </Fragment>
        );
      })}
    </App>
  );
}
