import { ErrorMessage } from '@/react-query/components/ErrorMessage';
import { LoadingIndicator } from '@/react-query/components/LoadingIndicator';
import { useRefreshByUser } from '@/react-query/hooks/useRefreshByUser';
import { fetchMovie, MovieDetails } from '@/react-query/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

export default function MovieDetailsScreen() {
  const { movie } = useLocalSearchParams<{ movie: string }>();

  return (
    <>
      <Stack.Screen options={{ title: movie }} />
      <MovieDetailsInfo movie={movie} />
    </>
  );
}

function MovieDetailsInfo({ movie }: { movie: string }) {
  const { isPending, error, data, refetch } = useQuery<MovieDetails, Error>({
    queryKey: ['movie', movie],
    queryFn: () => fetchMovie(movie),
    initialData: { title: movie } as MovieDetails,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (isPending) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
  if (!data) return null;

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
      <View style={styles.titleRow}>
        <Title>
          {data.title} ({data.year})
        </Title>
      </View>
      {data.info ? (
        <>
          <View style={styles.infoRow}>
            <Paragraph>{data.info.plot}</Paragraph>
          </View>
          <View style={styles.actorsRow}>
            <Paragraph>
              {data.info.actors.slice(0, -1).join(', ') + ' or ' + data.info.actors.slice(-1)}
            </Paragraph>
          </View>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    margin: 20,
  },
  infoRow: {
    flexDirection: 'row',
    margin: 20,
  },
  actorsRow: {
    flexDirection: 'column',
    margin: 20,
    marginTop: 10,
  },
});
