export let useMMKVDevTools;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    useMMKVDevTools = require('./useMMKVDevTools').useMMKVDevTools;
}
else {
    useMMKVDevTools = () => { };
}
//# sourceMappingURL=index.js.map