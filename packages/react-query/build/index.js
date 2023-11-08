export let useReactQueryDevTools;
if (process.env.NODE_ENV !== 'production') {
    useReactQueryDevTools = require('./useReactQueryDevTools').useReactQueryDevTools;
}
else {
    useReactQueryDevTools = () => { };
}
//# sourceMappingURL=index.js.map