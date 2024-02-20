import fs from 'fs';
import path from 'path';

import { type MetroStatsEntry } from './convertGraphToStats';
import { name, version } from '../../package.json';

/** The default location of the metro stats file */
export function getStatsPath(projectRoot: string) {
  return path.join(projectRoot, '.expo/stats.json');
}

/**
 * Create or overwrite the stats file with basic metadata.
 * This metdata is used by the API to determine version compatibility.
 */
export async function createStatsFile(projectRoot: string) {
  const metadata = { name, version };
  const filePath = getStatsPath(projectRoot);
  
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(metadata) + '\n');
}

/**
 * Add a new stats entry to the stats file.
 * This is appended on a new line, so we can load the stats selectively.
 */
export async function addStatsEntry(projectRoot: string, stats: MetroStatsEntry) {
  await fs.promises.appendFile(getStatsPath(projectRoot), JSON.stringify(stats) + '\n');
}
