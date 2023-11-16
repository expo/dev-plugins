export let useTinyBaseDevTools;
if (process.env.NODE_ENV !== 'production') {
    useTinyBaseDevTools = require('./useTinyBaseDevTools').useTinyBaseDevTools;
}
else {
    useTinyBaseDevTools = () => { };
}
//# sourceMappingURL=index.js.map