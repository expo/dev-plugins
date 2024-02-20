"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMetroBundleConfig = void 0;
var convertGraphToStats_1 = require("./convertGraphToStats");
var createStatsFile_1 = require("./createStatsFile");
function withMetroBundleConfig(config) {
    var _a, _b;
    if (!config.projectRoot) {
        throw new Error('No "projectRoot" configured in Metro config.');
    }
    var originalSerializer = (_b = (_a = config.serializer) === null || _a === void 0 ? void 0 : _a.customSerializer) !== null && _b !== void 0 ? _b : (function () { });
    var projectRoot = config.projectRoot;
    // Note(cedric): we don't have to await this, Metro would never bundle before this is finisheds
    (0, createStatsFile_1.createStatsFile)(projectRoot);
    // @ts-expect-error
    config.serializer.customSerializer = function (entryPoint, preModules, graph, options) {
        (0, createStatsFile_1.addStatsEntry)(projectRoot, (0, convertGraphToStats_1.convertGraphToStats)({ projectRoot: projectRoot, entryPoint: entryPoint, preModules: preModules, graph: graph, options: options }));
        return originalSerializer(entryPoint, preModules, graph, options);
    };
    return config;
}
exports.withMetroBundleConfig = withMetroBundleConfig;
//# sourceMappingURL=withMetroBundleConfig.js.map