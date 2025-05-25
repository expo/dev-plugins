export let useReduxDevTools: typeof import('./useReduxDevTools').useReduxDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useReduxDevTools = require('./useReduxDevTools').useReduxDevTools;
} else {
  useReduxDevTools = () => {};
}
