import { View } from 'react-native';

export const Spacer = ({ size = 8 }: { size?: number }) => {
  return <View style={{ height: size, width: size }} />;
};
