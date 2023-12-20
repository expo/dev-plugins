declare global {
  const process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };
}

export let useTinyBaseDevTools: typeof import('./useTinyBaseDevTools').useTinyBaseDevTools;

if (process.env.NODE_ENV !== 'production') {
  useTinyBaseDevTools = require('./useTinyBaseDevTools').useTinyBaseDevTools;
} else {
  useTinyBaseDevTools = () => {};
}
