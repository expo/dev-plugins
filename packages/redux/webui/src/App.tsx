import { App, List, Typography, Divider, Tabs, ThemeConfig, ConfigProvider } from 'antd'; // Importing components from Ant Design
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { Fragment, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

const { Item } = List;
const { Text } = Typography;
const { TabPane } = Tabs;

export default function Main() {
  const client = useDevToolsPluginClient('redux');
  const [storeHistory, setStoreHistory] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<any>();

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('storeUpdated', (data) => {
        if (!data.store) return;
        setStoreHistory((prevHistory) => [
          ...prevHistory,
          { state: data.store, action: data.lastAction },
        ]);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  const handleItemClick = (index: number) => {
    setSelectedState(storeHistory[index]);
  };

  const calculateDiff = (stateBefore: typeof selectedState, stateAfter: typeof selectedState) => {
    const diff: { [key: string]: any } = {};

    if (!stateBefore) return stateAfter;

    Object.keys(stateAfter).forEach((key) => {
      if (stateBefore[key] !== stateAfter[key]) {
        diff[key] = stateAfter[key];
      }
    });

    return diff;
  };

  return (
    <App
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '0.75em',
        overflowY: 'scroll',
      }}>
      <div style={{ flex: 1 }}>
        <Divider orientation="left">Action History</Divider>
        <List
          bordered
          dataSource={storeHistory}
          renderItem={(item, index) => (
            <Item
              onClick={() => handleItemClick(index)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedState === item ? '#f0f0f0' : 'white',
              }}>
              <Text strong>{index + 1}</Text> {/* Displaying index for clarity */}
              &nbsp; &nbsp;
              <Text strong>{!item?.action && '@@INIT'}</Text> {/* Displaying initial state */}
              <Text strong>{item.action?.type?.toUpperCase()}</Text> {/* Displaying action type */}
              <br />
              <Text type="secondary">
                {item.action?.time && new Date(item.action.time).toLocaleTimeString()}
              </Text>
              {/* Displaying timestamp */}
            </Item>
          )}
        />
      </div>
      <div style={{ flex: 2, marginLeft: '1em' }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="State" key="1">
            <ReactJson src={selectedState?.state} />
          </TabPane>
          <TabPane tab="Action Details" key="2">
            {selectedState?.action ? (
              <>
                <ReactJson
                  src={Object.keys(selectedState.state).reduce(
                    (acc: { [key: string]: any }, key) => {
                      if (key !== 'time') {
                        acc[key] = selectedState.state[key];
                      }
                      return acc;
                    },
                    {}
                  )}
                />
                <Text type="secondary">
                  Action dispatched at{' '}
                  {selectedState?.action?.time &&
                    new Date(selectedState?.action.time).toLocaleTimeString()}
                </Text>
              </>
            ) : (
              <Text>@@INIT</Text>
            )}
          </TabPane>
          <TabPane tab="Diff" key="3">
            {selectedState && (
              <ReactJson
                src={calculateDiff(
                  storeHistory[storeHistory.indexOf(selectedState) - 1]?.state,
                  selectedState.state
                )}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
    </App>
  );
}
