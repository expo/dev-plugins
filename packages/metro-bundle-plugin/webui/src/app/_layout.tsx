import { Slot } from 'expo-router';
import { QueryProvider } from '~/providers/query';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Slot />
    </QueryProvider>
  );
}
