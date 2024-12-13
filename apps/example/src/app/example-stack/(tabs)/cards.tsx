import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Cards() {
  const router = useRouter();

  return (
    <View>
      <Text>Cards</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/a-stack/a-stack-page-1')}
        text="Go to a stack page 1"
      />
      <Spacer />
      <Button onPress={() => router.navigate('/example-stack/(tabs)/home')} text="Go to home" />
    </View>
  );
}
