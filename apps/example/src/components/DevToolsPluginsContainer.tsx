import { useEffect, useRef, type ReactNode } from 'react';
import { useRootNavigation } from 'expo-router';

import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

interface Props {
  children: ReactNode;
}

export default function DevToolsPluginsContainer({ children }: Props) {
  if (__DEV__) {
    const navigationRef = useRef<ReturnType<typeof useRootNavigation>>(null);
    const rootNavigation = useRootNavigation();

    useReactNavigationDevTools(navigationRef);

    useEffect(() => {
      navigationRef.current = rootNavigation;
    }, [navigationRef.current]);
  }

  return <>{children}</>;
}
