export let useAsyncStorageDevTools;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    useAsyncStorageDevTools = require('./useAsyncStorageDevTools').useAsyncStorageDevTools;
}
else {
    useAsyncStorageDevTools = () => { };
}
//# sourceMappingURL=index.js.map