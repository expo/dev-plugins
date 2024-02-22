import { Slot } from 'expo-router';
import { QueryProvider } from '~/providers/query';
import { StatsProvider } from '~/providers/stats';

export default function RootLayout() {
  return (
    <QueryProvider>
      <StatsProvider>
        <Slot />
      </StatsProvider>
    </QueryProvider>
  );
}
