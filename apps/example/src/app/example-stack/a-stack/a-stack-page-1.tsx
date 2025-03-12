import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function AStackPage1() {
  const router = useRouter();

  return (
    <View>
      <Text>A Stack Page 1</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/a-stack/a-stack-page-2')}
        text="Go to page 2"
      />
      <Spacer />
      <Button onPress={() => router.replace('/example-stack/(tabs)/home')} text="Go to home" />
    </View>
  );
}
