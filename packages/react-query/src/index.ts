export let useReactQueryDevTools: typeof import('./useReactQueryDevTools').useReactQueryDevTools;

if (process.env.NODE_ENV !== 'production') {
  useReactQueryDevTools = require('./useReactQueryDevTools').useReactQueryDevTools;
} else {
  useReactQueryDevTools = () => {};
}
