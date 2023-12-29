export let useTinyBaseDevTools: typeof import('./useTinyBaseDevTools').useTinyBaseDevTools;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  useTinyBaseDevTools = require('./useTinyBaseDevTools').useTinyBaseDevTools;
} else {
  useTinyBaseDevTools = () => {};
}
