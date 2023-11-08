import * as React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoadingIndicator } from '@/react-query/components/LoadingIndicator';
import { ErrorMessage } from '@/react-query/components/ErrorMessage';
import { Divider } from '@/react-query/components/Divider';
import { ListItem } from '@/react-query/components/ListItem';
import { useRefreshByUser } from '@/react-query/hooks/useRefreshByUser';
import { useRefreshOnFocus } from '@/react-query/hooks/useRefreshOnFocus';
import { fetchMovies, Movie } from '@/react-query/lib/api';
import { MoviesStackNavigator } from '@/react-query/types';

type MoviesListScreenNavigationProp = NativeStackNavigationProp<MoviesStackNavigator, 'MoviesList'>;

type Props = {
  navigation: MoviesListScreenNavigationProp;
};

export default function MoviesListScreen({ navigation }: Props) {
  const { isPending, error, data, refetch } = useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onListItemPress = React.useCallback(
    (movie: any) => {
      navigation.navigate('MovieDetails', {
        movie,
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
        }></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
