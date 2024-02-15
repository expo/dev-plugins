import { Layout, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { parse } from 'flatted';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';

import QuerySidebar from './components/QuerySidebar';
import type { ExtendedQuery, SerializedQuery } from './types';
import { formatTimestamp, getObserversCounter, getQueryStatusLabel, isQueryActive } from './utils';
import styled from '@emotion/styled';
import { QueryCacheNotifyEvent } from '@tanstack/react-query';

const extendQuery = (query: SerializedQuery): ExtendedQuery => {
  const extendedQuery = query as ExtendedQuery;
  extendedQuery.key = query.queryHash;
  extendedQuery.status = query.state.status;
  extendedQuery.dataUpdateCount = query.state.dataUpdateCount;
  extendedQuery.observersCount = getObserversCounter(query);
  extendedQuery.isQueryActive = isQueryActive(query);

  return extendedQuery;
};

const columns: ColumnType<ExtendedQuery>[] = [
  {
    dataIndex: 'state',
    title: 'Data Updated At',
    width: 100,
    render: (_, query) => {
      return formatTimestamp(query.state.dataUpdatedAt);
    },
  },
  {
    dataIndex: 'status',
    title: 'Status',
    width: 80,
    render: (_, query) => {
      return getQueryStatusLabel(query);
    },
  },
  {
    dataIndex: 'dataUpdateCount',
    title: 'Data Updated Count',
    width: 40,
  },
  {
    dataIndex: 'isQueryActive',
    title: 'isActive',
    width: 40,
    render: (value: boolean) => String(value),
  },
  {
    dataIndex: 'observersCount',
    title: 'Observers',
    width: 40,
  },
  {
    dataIndex: 'queryHash',
    title: 'Query Hash',
  },
];

export default function App() {
  const client = useDevToolsPluginClient('react-query');
  const [queries, setQueries] = useState<ExtendedQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState('');

  const upsert = useCallback((query: SerializedQuery, queryHash: string) => {
    setQueries((prevQueries) => {
      const index = prevQueries.findIndex((q) => q.queryHash === queryHash);
      if (index >= 0) {
        return [
          ...prevQueries.slice(0, index),
          extendQuery(query),
          ...prevQueries.slice(index + 1),
        ];
      } else {
        return [...prevQueries, extendQuery(query)];
      }
    });
  }, []);

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('queries', (event) => {
        // That happens onConnect only
        setSelectedQueryId('');

        const data = parse(event.queries);
        const newQueries: ExtendedQuery[] = data.map((query: ExtendedQuery) => extendQuery(query));
        setQueries(newQueries);
      })
    );

    subscriptions.push(
      client?.addMessageListener('queryCacheEvent', (event) => {
        const cacheEvent = parse(event.cacheEvent) as QueryCacheNotifyEvent;
        const {
          type,
          query: serializedQuery,
          query: { queryHash },
        } = cacheEvent;

        if (!type) {
          return;
        }

        const query = serializedQuery as SerializedQuery;

        switch (type) {
          case 'added':
            setQueries((prevQueries) => [...prevQueries, extendQuery(query)]);
            break;
          case 'removed':
            setQueries((prevQueries) => prevQueries.filter((q) => q.queryHash !== queryHash));
            break;
          case 'updated':
          case 'observerAdded':
          case 'observerRemoved':
          case 'observerResultsUpdated':
          case 'observerOptionsUpdated':
            upsert(query, queryHash);
            break;
          default:
            break;
        }
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  const handleOnSelect = useCallback((record: ExtendedQuery): void => {
    setSelectedQueryId(record.queryHash);
  }, []);

  const handleQueryRefetch = useCallback(
    (query: ExtendedQuery): void => {
      client?.sendMessage('queryRefetch', { queryHash: query.queryHash });
    },
    [client]
  );

  const handleQueryRemove = useCallback(
    (query: ExtendedQuery): void => {
      setQueries((prevQueries) => prevQueries.filter((q) => q.queryHash !== query.queryHash));
      client?.sendMessage('queryRemove', { queryHash: query.queryHash });
    },
    [client]
  );

  const selectedQuery = useMemo(
    () => queries.find((query) => query.queryHash === selectedQueryId) ?? null,
    [queries, selectedQueryId]
  );

  return (
    <StyledLayout hasSider={true}>
      <Content>
        <Table<ExtendedQuery>
          dataSource={queries}
          columns={columns}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectedQueryId],
            onSelect: handleOnSelect,
          }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedQueryId(record.queryHash);
            },
          })}
        />
      </Content>
      <QuerySidebar
        query={selectedQuery}
        onQueryRefetch={handleQueryRefetch}
        onQueryRemove={handleQueryRemove}
      />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)({
  maxWidth: '100%',
});

const Content = styled(Layout.Content)({
  margin: '0 16px',
});
