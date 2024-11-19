# @dev-plugins/redux

A React Native Redux DevTool that can run in an Expo App

# Installation

### Add the package to your project

```
npx expo install @dev-plugins/redux
```

### Integrate redux with the DevTool hook

```jsx
import { useReduxDevTools } from '@dev-plugins/redux';
import { store } from './store';

export default function App() {
  useReduxDevTools(store);

  /* ... */
}
```

### Add middleware to store

```jsx
import { reduxDevToolsMiddleware } from '@dev-plugins/redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxDevToolsMiddleware),
);

```
