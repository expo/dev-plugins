import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useNavigation, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function AnotherStackPage2() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View>
      <Text>Another Stack Page 2</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/another-stack/page-3')}
        text="Go to page 3"
      />
      {/* <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/another-stack/another-stack-page-1')}
        text="Navigate to page 1"
      />
      <Spacer />
      <Button
        onPress={() => navigation.dispatch(StackActions.popTo('another-stack-page-1'))}
        text="Pop to to page 1"
      />
      <Spacer />
      <Button
        onPress={() =>
          navigation.dispatch(CommonActions.navigateDeprecated('another-stack-page-1'))
        }
        text="Navigate deprecated to page 1"
      /> */}
    </View>
  );
}
