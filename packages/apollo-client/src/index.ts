declare global {
  const process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };
}

export let useApolloClientDevTools: typeof import('./useApolloClientDevTools').useApolloClientDevTools;

if (process.env.NODE_ENV !== 'production') {
  useApolloClientDevTools = require('./useApolloClientDevTools').useApolloClientDevTools;
} else {
  useApolloClientDevTools = () => {};
}
