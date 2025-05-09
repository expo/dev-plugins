import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv';
import { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { MMKV, useMMKVString } from 'react-native-mmkv';
import { IconButton } from 'react-native-paper';

const storage = new MMKV();

function Main() {
  useMMKVDevTools();

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [item, setItem] = useMMKVString(key);

  const [allData, setAllData] = useState<[string, string | undefined][]>([]);

  const updateAllData = useCallback(() => {
    const keys = storage.getAllKeys();
    const keyValues = keys.map((key) => [key, storage.getString(key)]) as [
      string,
      string | undefined,
    ][];
    setAllData(keyValues);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateAllData, 1000);
    return () => clearInterval(interval);
  }, [updateAllData]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
      <Text>MMKV</Text>
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
          onPress={() => {
            setItem(value);
            updateAllData();
          }}
        />
        <IconButton
          icon="refresh"
          iconColor="#000"
          size={20}
          onPress={() => {
            setValue(item ?? '');
          }}
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
            <IconButton
              icon="delete"
              iconColor="#000"
              size={20}
              onPress={() => {
                storage.delete(key);
                updateAllData();
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function ReactNativeMMKVDemo() {
  return <Main />;
}
