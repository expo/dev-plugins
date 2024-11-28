# @dev-plugins/react-navigation

A React Navigation DevTool that can run in an Expo App

## Installation

### Add the package to your project

```bash
npx expo install @dev-plugins/react-navigation
```

## Usage

### Using with `react-navigation`

#### Integrate `react-navigation` with the DevTool hook

```jsx
import { useNavigationContainerRef } from '@react-navigation/native';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

export default function App() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  return <NavigationContainer ref={navigationRef}>{/* ... */}</NavigationContainer>;
}
```

### Using with `expo-router`

When using `expo-router`, integrate the DevTool in your main `_layout.tsx` file. You can import `useNavigationContainerRef` directly from `expo-router` and pass it to `useReactNavigationDevTools`:

```tsx
import { useNavigationContainerRef } from 'expo-router';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  return <Stack />
}
```

In this case, `expo-router` automatically manages the navigation container, so you just need to add the DevTool setup in your layout component.
