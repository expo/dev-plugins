import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function AStackPage2() {
  const router = useRouter();

  return (
    <View>
      <Text>A Stack Page 2</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/a-stack/page-3')}
        text="Go to page 3"
      />
    </View>
  );
}