export let useApolloClientDevTools;
if (process.env.NODE_ENV !== 'production') {
    useApolloClientDevTools = require('./useApolloClientDevTools').useApolloClientDevTools;
}
else {
    useApolloClientDevTools = () => { };
}
//# sourceMappingURL=index.js.map