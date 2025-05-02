import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { decrement, increment, incrementByAmount } from '@/redux/counterSlice';
import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { useReduxDevTools } from '@dev-plugins/redux';

function Main() {
  useReduxDevTools(store);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text>Counter: {count}</Text>
      <Pressable onPress={() => dispatch(increment())}>
        <Text>Increment </Text>
      </Pressable>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Decrement </Text>
      </Pressable>
      <Pressable onPress={() => dispatch(incrementByAmount(5))}>
        <Text> Increment by 5 </Text>
      </Pressable>
    </View>
  );
}

export default function AsyncStorageDemo() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
