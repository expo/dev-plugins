# @dev-plugins/apollo-client

An Apollo Client DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/apollo-client
```

### Integrate Apollo Client with the DevTool hook

```jsx
import { useApolloClientDevTools } from '@dev-plugins/apollo-client';

const client = new ApolloClient(...);

export default function App() {
  useApolloClientDevTools(client);

  return (
    <View>
      {/* ... */}
    </View>
  );
}
```
