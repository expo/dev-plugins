import styled from '@emotion/styled';
import { Layout, Typography } from 'antd';
import * as React from 'react';

import { Sidebar } from './Sidebar';
import type { NavigationState, StoreType } from './types';

type Props = StoreType;

export function NavigationTree({ logs }: Props) {
  const currentNavigationItem = logs[logs.length - 1];
  const previousNavigationItem = logs[logs.length - 2];

  const currentNavigationItemState = currentNavigationItem?.state;
  const previousNavigationItemState = previousNavigationItem?.state;

  const hasCurrentItem = !!currentNavigationItem && currentNavigationItemState;
  const hasPreviousItem = !!previousNavigationItem && previousNavigationItemState;

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Content style={{ height: '100%' }}>
        <Container>
          <HalfContainer>
            <Typography>Previous state</Typography>
            <HalfContent>
              {hasPreviousItem && <Node name="root" state={previousNavigationItemState} />}
            </HalfContent>
          </HalfContainer>
          <HalfContainer>
            <Typography>Current state</Typography>
            <HalfContent>
              {hasCurrentItem && <Node name="root" state={currentNavigationItemState} />}
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

const LeafTitle = styled(Typography.Text)({
  color: 'white',
});

const Leaf = ({ title, isSelectedTab }: { title: string; isSelectedTab?: boolean }) => {
  return (
    <LeafContainer>
      <LeafTitle style={{ textDecoration: isSelectedTab ? 'underline' : 'none' }}>
        {title}
      </LeafTitle>
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

const Node = ({ name, state }: { name: string; state: NavigationState }) => {
  const routes = state.routes;
  if (!routes || !routes.length) {
    return <Leaf title={name} />;
  }

  return (
    <NodeContainer>
      {routes.toReversed().map((route, index) => (
        <React.Fragment key={index}>
          {route.state?.routes && route.state.routes.length ? (
            <Node name={route.name} state={route.state} />
          ) : (
            <Leaf
              title={route.name}
              isSelectedTab={state.type === 'tab' && state.index === index}
            />
          )}
          <Spacer />
        </React.Fragment>
      ))}
      <Spacer />
      <NodeTitle>{name}</NodeTitle>
    </NodeContainer>
  );
};
