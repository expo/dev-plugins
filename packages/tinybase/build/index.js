export let useTinyBaseDevTools;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    useTinyBaseDevTools = require('./useTinyBaseDevTools').useTinyBaseDevTools;
}
else {
    useTinyBaseDevTools = () => { };
}
//# sourceMappingURL=index.js.map