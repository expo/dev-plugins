"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMetroBundlePlugin = void 0;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    exports.useMetroBundlePlugin = require('./useMetroBundlePlugin').useMetroBundlePlugin;
}
else {
    exports.useMetroBundlePlugin = function () { };
}
//# sourceMappingURL=index.js.map