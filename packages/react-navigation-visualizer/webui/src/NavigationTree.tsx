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
    <Layout>
      <Layout.Content style={{ height: '100vh', overflow: 'auto', paddingBottom: '60px' }}>
        <Container>
          <HalfContainer>
            <Typography>Previous state</Typography>
            <Spacer />
            <HalfContent>
              {hasPreviousItem && (
                <Node
                  name="root"
                  state={previousNavigationItemState}
                  parentColor={generateColor(previousNavigationItemState.key)}
                />
              )}
            </HalfContent>
          </HalfContainer>
          <HalfContainer>
            <Typography>Current state</Typography>
            <Spacer />
            <HalfContent>
              {hasCurrentItem && (
                <Node
                  name="root"
                  state={currentNavigationItemState}
                  parentColor={generateColor(currentNavigationItemState.key)}
                />
              )}
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
  flexDirection: 'row',
  height: '100%',
  flex: 1,
});

const HalfContainer = styled.div({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  overflow: 'auto',
  height: '100%',
  flex: 1,
});

const HalfContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  padding: 12,
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

const Leaf = ({
  title,
  isSelectedTab,
  color,
}: {
  title: string;
  isSelectedTab?: boolean;
  color: string;
}) => {
  return (
    <LeafContainer style={{ backgroundColor: color }}>
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

const Node = ({
  name,
  state,
  parentColor,
}: {
  name: string;
  state: NavigationState;
  parentColor: string;
}) => {
  const routes = state.routes;
  if (!routes || !routes.length) {
    return <Leaf title={name} color={parentColor} />;
  }

  const color = generateColor(state.key);

  return (
    <NodeContainer style={{ borderColor: color }}>
      {routes.toReversed().map((route, index) => (
        <React.Fragment key={index}>
          {route.state?.routes && route.state.routes.length ? (
            <Node name={route.name} state={route.state} parentColor={color} />
          ) : (
            <Leaf
              title={route.name}
              isSelectedTab={
                state.type === 'tab' && state.index === state.routes.length - 1 - index
              }
              color={color}
            />
          )}
          <Spacer />
        </React.Fragment>
      ))}
      <Spacer />
      <NodeTitle style={{ color }}>{name}</NodeTitle>
    </NodeContainer>
  );
};

const colorMap: Record<string, string> = {};
let currentHue = 0;

const generateColor = (key: string) => {
  if (colorMap[key]) {
    console.log(key);

    return colorMap[key];
  }

  currentHue = (currentHue + 9) % 360;
  const newColor = `hsl(${currentHue}, 70%, 50%)`;

  colorMap[key] = newColor;

  console.log(newColor);

  return newColor;
};
