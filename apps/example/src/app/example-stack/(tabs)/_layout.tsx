import { Tabs, usePathname } from 'expo-router';

export default function TabLayout() {
  const path = usePathname();
  console.log('TabLayout', path);

  return <Tabs />;
}
