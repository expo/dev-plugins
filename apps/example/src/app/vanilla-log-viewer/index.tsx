import { Button, StyleSheet, Text, View } from 'react-native';
import { useVanillaLogViewer } from '@dev-plugins/vanilla-log-viewer';

export default function VanillaLogView() {
  useVanillaLogViewer();

  return (
    <View style={styles.container}>
      <Button
        title="Send console.log"
        onPress={() => {
          console.log('Hello');
        }}
      />
      <Button
        title="Send console.log with extra arguments"
        onPress={() => {
          console.log('Hello', 'World', new Date().toISOString());
        }}
      />
      <Button
        title="Send console.warn"
        onPress={() => {
          console.warn('A warning should present as a yellow box in apps');
        }}
      />
      <Button
        title="Send console.error"
        onPress={() => {
          console.error(`Error happened at ${new Date().toISOString()}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
