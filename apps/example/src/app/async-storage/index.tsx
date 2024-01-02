import { useAsyncStorageDevTools } from '@dev-plugins/async-storage';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';

function Main() {
  useAsyncStorageDevTools();

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const { setItem, getItem, removeItem } = useAsyncStorage(key);

  const [allData, setAllData] = useState<readonly KeyValuePair[]>([]);

  const updateAllData = useCallback(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((data) => {
        setAllData(data);
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateAllData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
      <Text>Async Storage</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          marginVertical: 20,
        }}>
        <Text>Key: </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, minWidth: 200 }}
          onChangeText={(text) => {
            setKey(text);
            setValue('');
          }}
          value={key}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          marginVertical: 20,
        }}>
        <Text>Value: </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, minWidth: 200 }}
          onChangeText={setValue}
          value={value}
        />
        <IconButton
          icon="content-save"
          iconColor="#000"
          size={20}
          onPress={() => setItem(value).then(() => updateAllData())}
        />
        <IconButton
          icon="delete"
          iconColor="#000"
          size={20}
          onPress={() => removeItem().then(() => updateAllData())}
        />
        <IconButton
          icon="refresh"
          iconColor="#000"
          size={20}
          onPress={() => getItem().then((value) => setValue(value ?? ''))}
        />
      </View>
      <View style={{ width: '100%' }}>
        <Text>Entries:</Text>
        {allData.map(([key, value]) => (
          <View
            key={key}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              width: '100%',
              marginVertical: 20,
            }}>
            <Text>{key}: </Text>
            <Text>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function AsyncStorageDemo() {
  return <Main />;
}
