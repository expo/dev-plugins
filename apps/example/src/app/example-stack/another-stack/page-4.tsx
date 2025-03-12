import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { CommonActions, StackActions } from '@react-navigation/core';
import { useNavigation, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page4() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View>
      <Text>Page 4</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/another-stack/page-3')}
        text="Navigate to page 3 (but which ?)"
      />
      <Spacer />
      <Button
        onPress={() => navigation.dispatch(StackActions.popTo('page-3'))}
        text="Pop to page 3 (but which ?)"
      />
      <Spacer />
      <Button
        onPress={() => navigation.dispatch(CommonActions.navigateDeprecated('page-3'))}
        text="Navigate deprecated to page 3 (but which ?)"
      />
    </View>
  );
}
