import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page3() {
  const router = useRouter();
  return (
    <View>
      <Text>Page 3 in the first stack</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/another-stack/another-stack-page-1')}
        text="Go to second stack page 1"
      />
    </View>
  );
}
