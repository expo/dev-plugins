import { Button, Tabs } from 'antd';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { ScrollView } from 'react-native';

import { BlockType, Data } from './types';

export const TabsEnum = {
  query: { key: 'query', value: 'Query', plural: 'Queries' },
  mutation: { key: 'mutation', value: 'Mutation', plural: 'Mutations' },
  cache: { key: 'cache', value: 'Cache', plural: 'Caches' },
};

const TabItem = memo(
  ({
    active,
    onPress,
    data,
  }: {
    active: boolean;
    onPress: Dispatch<SetStateAction<any>>;
    data: any;
  }) => {
    return (
      <Button
        onClick={() => onPress(data)}
        type={active ? 'primary' : 'text'}
        block
        style={{ textAlign: 'left', margin: '5px 0' }}>
        {data?.name || '-'}
      </Button>
    );
  }
);

const { TabPane } = Tabs;

export function List({
  data,
  activeTab,
  selectedItem,
  onItemSelect,
  onTabChange,
}: {
  data: Data;
  activeTab: string;
  selectedItem: BlockType;
  onItemSelect: (block: BlockType) => void;
  onTabChange: (nextTab: string) => void;
}) {
  return (
    <ScrollView>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        {/* CACHE */}
        <TabPane tab={TabsEnum.cache.value} key={TabsEnum.cache.key}>
          {data?.cache?.map((d, i) => {
            const active = activeTab === TabsEnum.cache.key && selectedItem?.name === d?.name;

            return (
              <TabItem key={`cache${d?.id}${i}`} active={active} onPress={onItemSelect} data={d} />
            );
          })}
        </TabPane>
        {/* QUERY */}
        <TabPane tab={TabsEnum.query.value} key={TabsEnum.query.key}>
          {data?.queries?.map((d) => {
            const active = activeTab === TabsEnum.query.key && selectedItem?.id === d?.id;

            return (
              <TabItem key={`query${d?.id}`} active={active} onPress={onItemSelect} data={d} />
            );
          })}
        </TabPane>
        {/* MUTATION */}
        <TabPane tab={TabsEnum.mutation.value} key={TabsEnum.mutation.key}>
          {data?.mutations?.map((d) => {
            const active = activeTab === TabsEnum.mutation.key && selectedItem?.id === d?.id;

            return (
              <TabItem key={`mutation${d?.id}`} active={active} onPress={onItemSelect} data={d} />
            );
          })}
        </TabPane>
      </Tabs>
    </ScrollView>
  );
}
