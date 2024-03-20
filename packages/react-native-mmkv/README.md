# @dev-plugins/react-native-mmkv

A React Native MMKV DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/react-native-mmkv
```

### Integrate react-native-mmkv with the DevTool hook

```jsx
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv';


export default function App() {
  useMMKVDevTools();
  /* ... */
}
```
