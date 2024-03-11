import { Slot } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

import { StatsEntrySelect } from '~/components/forms/StatsEntrySelect';
import { Page, PageContent, PageNav } from '~/ui/Page';
import { QueryProvider } from '~/providers/query';
import { StatsEntryProvider } from '~/providers/stats';
import { ModuleFilterProvider } from '~/providers/modules';

// Import the Expo-required radix styles
import '@radix-ui/colors/green.css';
import '@radix-ui/colors/greenDark.css';
import '@radix-ui/colors/yellow.css';
import '@radix-ui/colors/yellowDark.css';
import '@radix-ui/colors/red.css';
import '@radix-ui/colors/redDark.css';
import '@radix-ui/colors/blue.css';
import '@radix-ui/colors/blueDark.css';
import '@radix-ui/colors/orange.css';
import '@radix-ui/colors/orangeDark.css';
import '@radix-ui/colors/purple.css';
import '@radix-ui/colors/purpleDark.css';
import '@radix-ui/colors/pink.css';
import '@radix-ui/colors/pinkDark.css';
import '@radix-ui/colors/slate.css';
import '@radix-ui/colors/slateDark.css';
// NOTE(cedric): these are not imported by `@expo/styleguide/dist/expo-theme.css`, but they are required for the syntax highlighting
import '@radix-ui/colors/gray.css';
import '@radix-ui/colors/grayDark.css';

import '~/styles-expo.css';
import '~/styles.css';

export default function RootLayout() {
  useWorkaroundForThemeClass();

  return (
    <QueryProvider>
      <StatsEntryProvider>
        <ModuleFilterProvider>
          <Page>
            <PageNav>
              <StatsEntrySelect />
            </PageNav>
            <PageContent>
              <Slot />
            </PageContent>
          </Page>
        </ModuleFilterProvider>
      </StatsEntryProvider>
    </QueryProvider>
  );
}

function useWorkaroundForThemeClass() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (!!document.body) {
      document.body.classList.remove('light-theme', 'dark-theme');
      if (colorScheme) {
        document.body.className = `${colorScheme}-theme`;
      }
    }
  }, [colorScheme]);
}
