import path from 'path';
export function convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options }) {
    return [
        path.relative(projectRoot, entryPoint),
        preModules.map((module) => convertModule(projectRoot, module)),
        convertGraph(projectRoot, graph),
        convertOptions(options),
    ];
}
function convertOptions(options) {
    return {
        ...options,
        processModuleFilter: undefined,
        createModuleId: undefined,
        getRunModuleStatement: undefined,
        shouldAddToIgnoreList: undefined,
    };
}
function convertGraph(projectRoot, graph) {
    return {
        ...graph,
        entryPoints: Array.from(graph.entryPoints.values()),
        dependencies: Array.from(graph.dependencies.values()).map((dependency) => (convertModule(projectRoot, dependency))),
    };
}
function convertModule(projectRoot, module) {
    return {
        nodeModuleName: getNodeModuleNameFromPath(module.path),
        dependencies: Array.from(module.dependencies.values()).map((dependency) => (path.relative(projectRoot, dependency.absolutePath))),
        size: getModuleOutputInBytes(module),
        path: path.relative(projectRoot, module.path),
    };
}
function getModuleOutputInBytes(module) {
    return module.output.reduce((bytes, module) => bytes + Buffer.byteLength(module.data.code, 'utf-8'), 0);
}
const nodeModuleNameCache = new Map();
function getNodeModuleNameFromPath(path) {
    if (nodeModuleNameCache.has(path)) {
        return nodeModuleNameCache.get(path) ?? null;
    }
    const segments = path.split('/');
    for (let i = segments.length - 1; i >= 0; i--) {
        if (segments[i] === 'node_modules') {
            let name = segments[i + 1];
            if (name.startsWith('@') && i + 2 < segments.length) {
                name += '/' + segments[i + 2];
            }
            nodeModuleNameCache.set(path, name);
            return name;
        }
    }
    return null;
}
//# sourceMappingURL=convertGraphToStats.js.map