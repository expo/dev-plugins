import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const client = useDevToolsPluginClient('metro-bundle-plugin');

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('ping', (data) => {
        alert(`Received ping from ${data.from}`);
        client?.sendMessage('ping', { from: 'web' });
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        That's the Web UI of the DevTools plugin. You can now edit the UI in the
        App.tsx.
      </Text>
      <Text style={[styles.text, styles.devHint]}>
        For development, you can also add `devServer` query string to specify
        the WebSocket target to the app's dev server.
      </Text>
      <Text style={[styles.text, styles.devHint]}>For example:</Text>
      <Pressable
        onPress={() => {
          window.location.href =
            window.location.href + '?devServer=localhost:8080';
        }}
      >
        <Text style={[styles.text, styles.textLink]}>
          {`${window.location.href}?devServer=localhost:8080`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  devHint: {
    color: '#666',
  },
  textLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
