import { ThemeProvider } from '@emotion/react';
import { Tabs, ThemeConfig, theme as antTheme } from 'antd';
import * as React from 'react';

declare module '@emotion/react' {
  export interface Theme extends ThemeConfig {}
}

const { TabPane } = Tabs;

export default function App() {
  const { token } = antTheme.useToken();

  const [activeKey, setActiveKey] = React.useState('logs');

  return (
    <ThemeProvider theme={{ token }}>
      <p>
        Test
      </p>
    </ThemeProvider>
  );
}


// export * from './plugin';
