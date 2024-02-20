import path from 'path';
import fs from 'fs';
import { convertGraphToStats } from './convertGraphToStats';
export function withMetroBundleConfig(config) {
    if (!config.projectRoot) {
        throw new Error('No "projectRoot" configured in Metro config.');
    }
    const originalSerializer = config.serializer?.customSerializer ?? (() => { });
    const projectRoot = config.projectRoot;
    const statsFile = path.join(config.projectRoot, '.expo/stats.json');
    if (!fs.existsSync(path.dirname(statsFile))) {
        fs.mkdirSync(path.dirname(statsFile), { recursive: true });
    }
    else {
        fs.writeFileSync(statsFile, '');
    }
    // @ts-expect-error
    config.serializer.customSerializer = (entryPoint, preModules, graph, options) => {
        const stats = convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options });
        fs.promises.appendFile(statsFile, JSON.stringify(stats) + '\n');
        return originalSerializer(entryPoint, preModules, graph, options);
    };
    return config;
}
//# sourceMappingURL=withMetroBundleConfig.js.map