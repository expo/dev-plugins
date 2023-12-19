import { Layout } from 'antd';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Details } from './Details';
import { Header } from './Header';
import { List, TabsEnum } from './List';
import type { BlockType, Data, Events } from './types';
import { createCacheBlock, createMutationBlocks, createQueryBlocks } from './utils';

const InitialData = {
  id: 'x',
  lastUpdateAt: new Date(),
  queries: [],
  mutations: [],
  cache: [],
};

let timer: ReturnType<typeof setTimeout>;

function debounce(func: (...args: any) => any, timeout = 7000): void {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // @ts-expect-error add typings for this
    func.apply(this, args);
  }, timeout);
}

export default function App() {
  const client = useDevToolsPluginClient('apollo-client');
  const [data, setData] = useState<Data>(InitialData);
  const [selectedItem, setSelectedItem] = useState<BlockType>({});
  const [activeTab, setActiveTab] = useState(TabsEnum.cache.key);

  useEffect(() => {
    const subscriptions: EventSubscription = [];

    subscriptions.push(
      client?.addMessageListener('GQL:response', (newData: any) => {
        const finalData = {
          ...newData,
          mutations: createMutationBlocks(newData?.mutations).reverse(),
          queries: createQueryBlocks(newData?.queries).reverse(),
          cache: createCacheBlock(newData?.cache),
        };

        setData(finalData);
        client?.sendMessage('GQL:ack', {});
        resyncData();
      })
    );
    client?.sendMessage('GQL:request', {});

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  const resyncData = () => {
    debounce(() => {
      client?.sendMessage('GQL:request', {});
    });
  };

  const resetSync = () => {
    clearTimeout(timer);
  };

  function handleClear() {
    setData(InitialData);
    setSelectedItem({});
  }

  function handleRefresh() {
    client?.sendMessage('GQL:request', {});
  }

  function handleSelectedItem(block: BlockType) {
    setSelectedItem(block);
  }

  function handleTabChange(nextTab: string) {
    setActiveTab(nextTab);
    setSelectedItem({});
  }

  return (
    <View style={styles.container}>
      <Layout>
        <Layout hasSider>
          <Layout.Sider width="40%" style={styles.sider}>
            <View style={styles.sider}>
              <Header onRefresh={handleRefresh} onClear={handleClear} />
              <List
                data={data}
                activeTab={activeTab}
                selectedItem={selectedItem}
                onItemSelect={handleSelectedItem}
                onTabChange={handleTabChange}
              />
            </View>
          </Layout.Sider>
          <Layout.Content style={styles.content}>
            <Details selectedItem={selectedItem} />
          </Layout.Content>
        </Layout>
      </Layout>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  sider: {
    backgroundColor: '#fff',
    padding: 8,
    overflow: 'scroll',
  },
  content: {
    padding: 8,
    overflow: 'scroll'
  },
});
