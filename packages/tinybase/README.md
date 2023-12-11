# @dev-plugins/tinybase

A TinyBase DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/tinybase
```

### Integrate TinyBase with the DevTool hook

```jsx
import { useTinyBaseDevTools } from '@dev-plugins/tinybase';

const store = createStore();

export default function App() {
  useTinyBaseDevTools(store);

  return <View>{/* ... */}</View>;
}
```
