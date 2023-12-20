declare global {
  const process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };
}

export let useReactNavigationDevTools: typeof import('./useReactNavigationDevTools').useReactNavigationDevTools;

if (process.env.NODE_ENV !== 'production') {
  useReactNavigationDevTools = require('./useReactNavigationDevTools').useReactNavigationDevTools;
} else {
  useReactNavigationDevTools = () => {};
}
