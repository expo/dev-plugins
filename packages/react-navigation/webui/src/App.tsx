import { Layout, Tabs, theme as antTheme, ThemeConfig } from 'antd';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { theme } from './theme';

import { LinkingTester } from './LinkingTester';
import { Logs } from './Logs';
import { usePluginStore } from './usePluginStore';

declare module '@emotion/react' {
  export interface Theme extends ThemeConfig {}
}

const { TabPane } = Tabs;

export default function App() {
  const store = usePluginStore();
  const { token } = antTheme.useToken();

  const [activeKey, setActiveKey] = React.useState('logs');

  return (
    <ThemeProvider theme={{ token }}>
      <Container>
        <Tabs activeKey={activeKey} onChange={setActiveKey} tabBarStyle={{ marginBottom: 8 }}>
          <TabsContent tab={<TabLabel>Logs</TabLabel>} key="logs">
            <Logs active={activeKey === 'logs'} {...store} />
          </TabsContent>
          <TabsContent tab={<TabLabel>Linking</TabLabel>} key="linking">
            <LinkingTester active={activeKey === 'linking'} {...store} />
          </TabsContent>
        </Tabs>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled(Layout)({
  padding: `0 ${theme.space.large}px`,
});

const TabLabel = styled.span({
  padding: `0 ${theme.space.large}px`,
});

const TabsContent = styled(TabPane)({
  height: 'calc(100vh - 80px)',
});

// export * from './plugin';
