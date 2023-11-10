import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: '#000',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: '#222',
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
  const backgroundStyle = {
    backgroundColor: '#F3F3F3',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
          <View
            style={{
              backgroundColor: '#fff',
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
