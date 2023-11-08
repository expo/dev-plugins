import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  useTimeByCurrentIp,
  UseTimeByCurrentIpOptions,
  useTimeByTimeZone,
  UseTimeByTimeZoneOptions,
} from '@/react-query-time/use-time';

import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient();

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  useReactQueryDevTools(queryClient);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function TimeByCurrentIp({ options = {} }: { options?: UseTimeByCurrentIpOptions }) {
  const { data, isError, isLoading, error } = useTimeByCurrentIp(options);

  if (isError) {
    return <Text>Error: {error!.message}</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Text>{data?.datetime}</Text>;
}

function TimeByTimeZone({
  zone,
  options = {},
}: {
  zone: string;
  options?: UseTimeByTimeZoneOptions;
}) {
  const { data, isError, isLoading, error } = useTimeByTimeZone(zone, options);

  if (isError) {
    return <Text>Error: {error!.message}</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text>
      {zone}: {data?.datetime}
    </Text>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Time by current IP">
              <TimeByCurrentIp />
            </Section>
            <Section title="Time by current IP (with interval)">
              <TimeByCurrentIp
                options={{
                  refetchInterval: 5000,
                }}
              />
            </Section>
            <Section title="Time by zone">
              <TimeByTimeZone zone="America/New_York" />
              <TimeByTimeZone
                zone="America/Argentina/Buenos_Aires"
                options={{
                  //   cacheTime: 5000,
                  refetchInterval: 60000,
                  staleTime: 1000,
                }}
              />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
