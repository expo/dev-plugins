import fs from 'fs';
import { mapLines, readFirstLine, readLine } from '../utils/file';
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
/**
 * List all stats entries without parsing the data.
 * This only reads the bundle name, and adds a line number as ID.
 */
export async function listStatsEntries(statsFile) {
    const entries = [];
    const bundlePattern = /^\["([^"]+)/;
    await mapLines(statsFile, (index, line) => {
        if (index === 1)
            return;
        const [_, name] = line.match(bundlePattern) ?? [];
        if (name) {
            entries.push({ id: index, name });
        }
    });
    return entries;
}
/**
 * Get the stats entry by id or line number, and parse the data.
 */
export async function getStatsEntry(statsFile, id) {
    const line = await readLine(statsFile, id);
    if (!line) {
        throw new Error(`Stats entry "${id}" not found.`);
    }
    return JSON.parse(line);
}
//# sourceMappingURL=readStatsFile.js.map