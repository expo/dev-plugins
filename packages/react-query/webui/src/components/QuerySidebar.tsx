import { Button, Collapse, type CollapseProps, Layout, Space } from 'antd';
import styled from '@emotion/styled';
import ReactJson from 'react-json-view';
import type { ExtendedQuery } from '../types';
import DataViewer from './DataViewer';

const ContainerWithPaddings = styled(Layout)({
  padding: '10px 5px',
});

interface Props {
  query: ExtendedQuery | null;
  onQueryRefetch: (query: ExtendedQuery) => void;
  onQueryRemove: (query: ExtendedQuery) => void;
}

export default function QuerySidebar({ query, onQueryRefetch, onQueryRemove }: Props) {
  const panels: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Actions',
      children: (
        <Space>
          <Button
            type="primary"
            disabled={query?.state?.fetchStatus === 'fetching'}
            onClick={() => {
              if (query) {
                onQueryRefetch(query);
              }
            }}>
            Refetch
          </Button>
          <Button
            type="default"
            danger={true}
            onClick={() => {
              if (query) {
                onQueryRemove(query);
              }
            }}>
            Remove
          </Button>
        </Space>
      ),
    },
    {
      key: '2',
      label: 'Data Explorer',
      children: (
        <ContainerWithPaddings>
          <DataViewer src={query?.state?.data || {}}  />
        </ContainerWithPaddings>
      ),
    },
    {
      key: '3',
      label: 'Query Explorer',
      children: (
        <ContainerWithPaddings>
          <ReactJson src={query || {}} enableClipboard={false} collapsed />
        </ContainerWithPaddings>
      ),
    },
  ];

  return (
    <Layout.Sider style={{ height: '100vh', overflow: 'auto' }} width="30%" theme="light">
      <Collapse items={panels} bordered={false} />
    </Layout.Sider>
  );
}
