declare global {
  const process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };
}

export let useReactQueryDevTools: typeof import('./useReactQueryDevTools').useReactQueryDevTools;

if (process.env.NODE_ENV !== 'production') {
  useReactQueryDevTools = require('./useReactQueryDevTools').useReactQueryDevTools;
} else {
  useReactQueryDevTools = () => {};
}
