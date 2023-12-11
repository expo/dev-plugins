# @dev-plugins/react-query

A TanStack Query DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/react-query
```

### Integrate react-query with the DevTool hook

```jsx
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient(...);

export default function App() {
  useReactQueryDevTools(queryClient);

  return (
    <View>
      {/* ... */}
    </View>
  );
}
```
