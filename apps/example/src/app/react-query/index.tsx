import * as React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { Divider } from '@/react-query/components/Divider';
import { ListItem } from '@/react-query/components/ListItem';
import { useRefreshByUser } from '@/react-query/hooks/useRefreshByUser';
import { useRefreshOnFocus } from '@/react-query/hooks/useRefreshOnFocus';
import { fetchMovies, Movie } from '@/react-query/lib/api';

export default function MoviesListScreen() {
  const navigation = useNavigation();
  const { data, refetch } = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onListItemPress = React.useCallback(
    (movie: any) => {
      console.log('movie:', movie);
      // @ts-expect-error: untyped
      navigation.navigate('[movie]', {
        movie: movie.title,
      });
    },
    [navigation]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => {
      return <ListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress]
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'React Query Example' }} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
