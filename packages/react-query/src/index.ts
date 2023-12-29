export let useReactQueryDevTools: typeof import('./useReactQueryDevTools').useReactQueryDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useReactQueryDevTools = require('./useReactQueryDevTools').useReactQueryDevTools;
} else {
  useReactQueryDevTools = () => {};
}
