export let useReactNavigationDevTools: typeof import('./useReactNavigationDevTools').useReactNavigationDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useReactNavigationDevTools = require('./useReactNavigationDevTools').useReactNavigationDevTools;
} else {
  useReactNavigationDevTools = () => {};
}
