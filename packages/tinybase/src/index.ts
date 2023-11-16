export let useTinyBaseDevTools: typeof import('./useTinyBaseDevTools').useTinyBaseDevTools;

if (process.env.NODE_ENV !== 'production') {
  useTinyBaseDevTools = require('./useTinyBaseDevTools').useTinyBaseDevTools;
} else {
  useTinyBaseDevTools = () => {};
}
