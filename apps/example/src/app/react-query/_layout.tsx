import { Stack } from 'expo-router';
import { AppStateStatus, Platform } from 'react-native';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';

import { useAppState } from '@/react-query/hooks/useAppState';
import { useOnlineManager } from '@/react-query/hooks/useOnlineManager';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  useAppState(onAppStateChange);
  useOnlineManager();
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
