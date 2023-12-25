# @dev-plugins/vanilla-log-viewer

An example of DevTools plugin using vanilla JavaScript to show console logs

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/vanilla-log-viewer
```

### Integrate the plugin with your app

```jsx
import { useVanillaLogViewer } from '@dev-plugins/vanilla-log-viewer';

export default function App() {
  useVanillaLogViewer();

  return <View>{/* ... */}</View>;
}
```
