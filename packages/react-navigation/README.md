# @dev-plugins/react-navigation

A React Navigation DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/react-navigation
```

### Integrate react-navigation with the DevTool hook

```jsx
import { useNavigationContainerRef } from '@react-navigation/native';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

export default function App() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  return <NavigationContainer ref={navigationRef}>{/* ... */}</NavigationContainer>;
}
```
