import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import * as React from 'react';

import { Sidebar } from './Sidebar';
import type { NavigationRoute, StoreType } from './types';

type Props = StoreType;

export function NavigationTree({ logs }: Props) {
  const currentNavigationItem = logs[logs.length - 1];
  const previousNavigationItem = logs[logs.length - 2];

  const hasCurrentItem = !!currentNavigationItem;
  const hasPreviousItem = !!previousNavigationItem;

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Content style={{ height: '100%' }}>
        <Container>
          <HalfContainer>
            <Typography>Previous state</Typography>
            <HalfContent>
              {hasPreviousItem && (
                <Node name="root" routes={previousNavigationItem.state?.routes} />
              )}
            </HalfContent>
          </HalfContainer>
          <HalfContainer>
            <Typography>Current state</Typography>
            <HalfContent>
              {hasCurrentItem && <Node name="root" routes={currentNavigationItem.state?.routes} />}
            </HalfContent>
          </HalfContainer>
        </Container>
      </Layout.Content>
      {hasCurrentItem ? (
        <Sidebar
          action={currentNavigationItem.action}
          state={currentNavigationItem.state}
          stack={currentNavigationItem.stack}
        />
      ) : null}
    </Layout>
  );
}

const Container = styled.div({
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'row',
  height: 'calc(100vh - 80px)',
  flex: 1,
});

const HalfContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  justifyContent: 'space-between',
  height: '100%',
  flex: 1,
});

const HalfContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  justifyContent: 'flex-end',
  height: '100%',
  flex: 1,
});

const Spacer = styled.div({
  height: 4,
});

const LeafContainer = styled.div(({ theme: antdTheme }) => ({
  display: 'flex',
  backgroundColor: antdTheme.token?.colorPrimary,
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
}));

const LeafTitle = styled(Typography)({
  color: 'white',
});

const Leaf = ({ title }: { title: string }) => {
  return (
    <LeafContainer>
      <LeafTitle>{title}</LeafTitle>
    </LeafContainer>
  );
};

const NodeContainer = styled.div(({ theme: antdTheme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  borderWidth: 1,
  border: 'solid',
  borderColor: antdTheme.token?.colorPrimary,
  padding: 8,
}));

const NodeTitle = styled(Typography)(({ theme }) => ({
  color: theme.token?.colorPrimary,
  alignSelf: 'flex-start',
}));

const Node = ({ name, routes }: { name: string; routes: NavigationRoute[] | undefined }) => {
  if (!routes || !routes.length) {
    return <Leaf title={name} />;
  }

  return (
    <NodeContainer>
      {routes.toReversed().map((route, index) => (
        <React.Fragment key={index}>
          <Node name={route.name} routes={route.state?.routes} />
          <Spacer />
        </React.Fragment>
      ))}
      <Spacer />
      <NodeTitle>{name}</NodeTitle>
    </NodeContainer>
  );
};
