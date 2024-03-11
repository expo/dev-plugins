export let useMetroBundlePlugin: typeof import('./useMetroBundlePlugin').useMetroBundlePlugin;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useMetroBundlePlugin = require('./useMetroBundlePlugin').useMetroBundlePlugin;
} else {
  useMetroBundlePlugin = () => {};
}
