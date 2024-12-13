import { Pressable, Text } from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

export const Button = ({ onPress, text }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}>
      <Text style={{ lineHeight: 20, color: 'white' }}>{text}</Text>
    </Pressable>
  );
};
