import { ThemeProvider } from '@emotion/react';
import { Button, Flex, Table, Tabs, ThemeConfig, theme as antTheme } from 'antd';
import * as React from 'react';
import { usePluginStore } from './usePluginStore';

declare module '@emotion/react' {
  export interface Theme extends ThemeConfig {}
}

const { TabPane } = Tabs;

export default function App() {
  const { token } = antTheme.useToken();

  const { entries, update, set, remove } = usePluginStore(console.error);

  return (
    <ThemeProvider theme={{ token }}>
      <Table
        dataSource={entries}
        columns={[
          { title: 'Key', dataIndex: 'key', key: 'key' },
          { title: 'Value', dataIndex: 'value', key: 'value' },
        ]}
        title={() => (
          <Flex align="center" justify="center">
            <h1>Async Storage Devtools</h1>
            <Button onClick={() => update().catch(console.error)}>Refresh</Button>
          </Flex>
        )}
      />
    </ThemeProvider>
  );
}
