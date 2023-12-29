export let useApolloClientDevTools: typeof import('./useApolloClientDevTools').useApolloClientDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useApolloClientDevTools = require('./useApolloClientDevTools').useApolloClientDevTools;
} else {
  useApolloClientDevTools = () => {};
}
