declare global {
  const process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };
}

export let <%= project.hookName %>: typeof import('./<%= project.hookName %>').<%= project.hookName %>;

if (process.env.NODE_ENV !== 'production') {
  <%= project.hookName %> = require('./<%= project.hookName %>').<%= project.hookName %>;
} else {
  <%= project.hookName %> = () => {};
}
