import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, type LinkProps } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TesterScreen() {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TestCase title="Apollo Client" route="/apollo-client/" />
        <TestCase title="React Query" route="/react-query/" />
        <TestCase title="React Query Time" route="/react-query-time/" />
        <TestCase title="TinyBase" route="/tinybase/" />
      </View>
    </SafeAreaView>
  );
}

function TestCase<T>({ title, route }: { title: string; route: LinkProps<T>['href'] }) {
  return (
    <Link href={route} asChild>
      <Pressable style={styles.testCaseContainer}>
        <Text style={styles.testCaseText}>{title}</Text>
        <FontAwesome name="angle-right" size={20} color="#666" />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  testCaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  testCaseText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
