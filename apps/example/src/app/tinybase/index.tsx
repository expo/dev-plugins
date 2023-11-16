import { createStore } from 'tinybase';
import { Button, Text, View } from 'react-native';
import { useValue, Provider } from 'tinybase/lib/ui-react';
import { useTinyBaseDevTools } from '@dev-plugins/tinybase';

const store = createStore().setValue('counter', 0);

/** Silly: sync the full store every time something changes **/

function Main() {
  useTinyBaseDevTools(store);
  const count = useValue('counter');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Counter: {count}</Text>
      <Button
        title="Increment"
        onPress={() => store.setValue('counter', parseInt(count?.toString() ?? '0', 10) + 1)}
      />
    </View>
  );
}

export default function TinybaseDemo() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
