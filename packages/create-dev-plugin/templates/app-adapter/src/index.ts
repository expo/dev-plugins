export let <%= project.hookName %>: typeof import('./<%= project.hookName %>').<%= project.hookName %>;

// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
  <%= project.hookName %> = require('./<%= project.hookName %>').<%= project.hookName %>;
} else {
  <%= project.hookName %> = () => {};
}
