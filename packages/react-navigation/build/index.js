export let useReactNavigationDevTools;
if (process.env.NODE_ENV !== 'production') {
    useReactNavigationDevTools = require('./useReactNavigationDevTools').useReactNavigationDevTools;
}
else {
    useReactNavigationDevTools = () => { };
}
//# sourceMappingURL=index.js.map