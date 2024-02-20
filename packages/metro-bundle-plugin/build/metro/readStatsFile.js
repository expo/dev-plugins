import fs from 'fs';
import { mapLines, readFirstLine } from '../utils/file';
import { getStatsMetdata } from './createStatsFile';
export async function validateStatsFile(statsFile, metadata = getStatsMetdata()) {
    if (!fs.existsSync(statsFile)) {
        throw new Error(`Stats file "${statsFile}" not found.`);
    }
    const line = await readFirstLine(statsFile);
    const data = line ? JSON.parse(line) : {};
    if (data.name !== metadata.name || data.version !== metadata.version) {
        throw new Error(`Stats file "${statsFile}" is incompatible with this version of the plugin.`);
    }
}
export async function listStatsEntries(statsFile) {
    const entries = [];
    const bundlePattern = /^\["([^"]+)/;
    await mapLines(statsFile, (index, line) => {
        if (index === 1)
            return;
        const [_, name] = line.match(bundlePattern) ?? [];
        if (name) {
            entries.push({ id: index - 1, name });
        }
    });
    return entries;
}
//# sourceMappingURL=readStatsFile.js.map