export let useAsyncStorageDevTools: typeof import('./useAsyncStorageDevTools').useAsyncStorageDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useAsyncStorageDevTools = require('./useAsyncStorageDevTools').useAsyncStorageDevTools;
} else {
  useAsyncStorageDevTools = () => {};
}
