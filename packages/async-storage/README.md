# @dev-plugins/async-storage

A React Native Async Storage DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/async-storage
```

### Integrate async-storage with the DevTool hook

```jsx
import { useAsyncStorageDevTools } from '@dev-plugins/async-storage';

export default function App() {
  useAsyncStorageDevTools();

  /* ... */
}
```

### Future Plans

- JSON support in the DevTool's value column (using [React JSON Viewer](https://github.com/microlinkhq/react-json-view))
- Improve the DevTool's UI to get rid of calls to `prompt`
