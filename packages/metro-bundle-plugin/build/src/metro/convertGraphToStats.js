"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertGraphToStats = void 0;
var path_1 = __importDefault(require("path"));
function convertGraphToStats(_a) {
    var projectRoot = _a.projectRoot, entryPoint = _a.entryPoint, preModules = _a.preModules, graph = _a.graph, options = _a.options;
    return [
        path_1.default.relative(projectRoot, entryPoint),
        preModules.map(function (module) { return convertModule(projectRoot, module); }),
        convertGraph(projectRoot, graph),
        convertOptions(options),
    ];
}
exports.convertGraphToStats = convertGraphToStats;
function convertOptions(options) {
    return __assign(__assign({}, options), { processModuleFilter: undefined, createModuleId: undefined, getRunModuleStatement: undefined, shouldAddToIgnoreList: undefined });
}
function convertGraph(projectRoot, graph) {
    return __assign(__assign({}, graph), { entryPoints: Array.from(graph.entryPoints.values()), dependencies: Array.from(graph.dependencies.values()).map(function (dependency) { return (convertModule(projectRoot, dependency)); }) });
}
function convertModule(projectRoot, module) {
    var nodeModuleName = getNodeModuleNameFromPath(module.path);
    return {
        nodeModuleName: nodeModuleName || '[unknown]',
        isNodeModule: !!nodeModuleName,
        dependencies: Array.from(module.dependencies.values()).map(function (dependency) { return (path_1.default.relative(projectRoot, dependency.absolutePath)); }),
        relativePath: path_1.default.relative(projectRoot, module.path),
        absolutePath: module.path,
        size: getModuleOutputInBytes(module),
        // source: module.getSource().toString(),
        // output: module.output.map((output) => ({
        //   type: output.type,
        //   data: output.data,
        // })),
    };
}
function getModuleOutputInBytes(module) {
    return module.output.reduce(function (bytes, module) { return bytes + Buffer.byteLength(module.data.code, 'utf-8'); }, 0);
}
var nodeModuleNameCache = new Map();
function getNodeModuleNameFromPath(path) {
    var _a;
    if (nodeModuleNameCache.has(path)) {
        return (_a = nodeModuleNameCache.get(path)) !== null && _a !== void 0 ? _a : null;
    }
    var segments = path.split('/');
    for (var i = segments.length - 1; i >= 0; i--) {
        if (segments[i] === 'node_modules') {
            var name_1 = segments[i + 1];
            if (name_1.startsWith('@') && i + 2 < segments.length) {
                name_1 += '/' + segments[i + 2];
            }
            nodeModuleNameCache.set(path, name_1);
            return name_1;
        }
    }
    return null;
}
//# sourceMappingURL=convertGraphToStats.js.map