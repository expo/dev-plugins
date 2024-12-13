import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function AnotherStackPage1() {
  const router = useRouter();

  return (
    <View>
      <Text>AStackPage1</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/another-stack/another-stack-page-2')}
        text="Go to another stack page 2"
      />
    </View>
  );
}
