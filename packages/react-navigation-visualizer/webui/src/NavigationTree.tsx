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
          Legend={<Legend />}
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
  width: 4,
});

const LeafContainer = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  flexGrow: 1,
  borderRadius: 4,
  backgroundColor: color,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
}));

const SelectedLeafContainer = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: 4,
  border: 'dashed',
  borderColor: color,
  borderRadius: 4,
  borderWidth: 2,
}));

const LeafTitle = styled(Typography.Text)<{ isSelected?: boolean }>(({ isSelected }) => ({
  color: 'white',
  textDecoration: isSelected ? 'underline' : 'none',
}));

const Leaf = ({
  title,
  isSelectedTab,
  color,
}: {
  title: string;
  isSelectedTab?: boolean;
  color: string;
}) => {
  const Wrapper = isSelectedTab ? SelectedLeafContainer : React.Fragment;
  return (
    <Wrapper color={color}>
      <LeafContainer color={color}>
        <LeafTitle isSelected={isSelectedTab}>{title}</LeafTitle>
      </LeafContainer>
    </Wrapper>
  );
};

const NodeContainer = styled.div<{ color: string; isClosed?: boolean }>(({ color, isClosed }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  borderWidth: 1,
  border: 'solid',
  borderColor: color,
  borderTopWidth: isClosed ? 1 : 0,
  borderTopLeftRadius: isClosed ? 4 : 0,
  borderTopRightRadius: isClosed ? 4 : 0,
  padding: 8,
  paddingTop: 4,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  ':hover:not(:has(:hover))': {
    backgroundColor: `${color}30`,
  },
}));

const NodeTitle = styled(Typography)<{ color: string }>(({ color }) => ({
  alignSelf: 'flex-start',
  color,
}));

const ClosedNodeTitle = styled(Typography)<{ color: string }>(({ color }) => ({
  alignSelf: 'center',
  color,
}));

const TabContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const Node = ({
  name,
  state,
  parentColor,
}: {
  name: string;
  state: NavigationState;
  parentColor: string;
}) => {
  const [isClosed, setIsClosed] = React.useState(false);

  const routes = state.routes;
  if (!routes || !routes.length) {
    return <Leaf title={name} color={parentColor} />;
  }

  const color = generateColor(state.key);

  const StackWrapper = state.type === 'tab' ? TabContainer : React.Fragment;

  if (isClosed) {
    return <ClosedNode name={name} color={color} openNode={() => setIsClosed(false)} />;
  }

  return (
    <NodeContainer
      color={color}
      onClick={(e) => {
        setIsClosed(true);
        e.stopPropagation();
      }}>
      <StackWrapper>
        {routes.toReversed().map((route, index) => (
          <React.Fragment key={route.key}>
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
            {index < routes.length - 1 ? <Spacer /> : null}
          </React.Fragment>
        ))}
      </StackWrapper>
      <NodeTitle color={color}>{name}</NodeTitle>
    </NodeContainer>
  );
};

const ClosedNode = ({
  name,
  color,
  openNode,
}: {
  name: string;
  color: string;
  openNode: () => void;
}) => {
  return (
    <NodeContainer
      color={color}
      style={{ borderColor: color }}
      onClick={(e) => {
        openNode();
        e.stopPropagation();
      }}
      isClosed>
      <ClosedNodeTitle color={color}>{name}</ClosedNodeTitle>
    </NodeContainer>
  );
};

const colorMap: Record<string, string> = {};
let currentIndex = 0;

const colorList = [
  '#EF5350',
  '#EC407A',
  '#AB47BC',
  '#7E57C2',
  '#5C6BC0',
  '#42A5F5',
  '#29B6F6',
  '#26C6DA',
  '#26A69A',
  '#66BB6A',
];

const generateColor = (key: string) => {
  if (colorMap[key]) {
    return colorMap[key];
  }

  currentIndex = (currentIndex + 1) % colorList.length;
  const newColor = colorList[currentIndex];

  colorMap[key] = newColor;

  return newColor;
};

const legendRed = '#EF5350';

const Legend = () => {
  return (
    <div style={{ padding: 12 }}>
      <NodeContainer color={legendRed}>
        <Leaf title="Screen" color={legendRed} />
        <div style={{ height: 4 }} />
        <NodeTitle color={legendRed}>Stack Navigator</NodeTitle>
      </NodeContainer>
      <div style={{ height: 12 }} />
      <NodeContainer color={legendRed}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Leaf title="Unselected Tab" color={legendRed} />
          <div style={{ width: 4 }} />
          <SelectedLeafContainer color={legendRed}>
            <Leaf title="Selected Tab" color={legendRed} />
          </SelectedLeafContainer>
        </div>
        <div style={{ height: 4 }} />
        <NodeTitle color={legendRed}>Tab Navigator</NodeTitle>
      </NodeContainer>
    </div>
  );
};
