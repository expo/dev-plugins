import fs from 'fs';
import path from 'path';

import { type MetroStatsEntry } from './convertGraphToStats';
import { name, version } from '../../package.json';
import { env } from '../utils/env';
import { mapLines, readFirstLine, readLine } from '../utils/file';

export type StatsMetadata = { name: string; version: string };

/** The default location of the metro stats file */
export function getStatsPath(projectRoot: string) {
  return path.join(projectRoot, '.expo/stats.json');
}

/** The information to validate if a stats file is compatible with this library version */
export function getStatsMetdata(): StatsMetadata {
  return { name, version };
}

/** Validate if the stats file is compatible with this library version */
export async function validateStatsFile(statsFile: string, metadata = getStatsMetdata()) {
  if (!fs.existsSync(statsFile)) {
    throw new Error(`Stats file "${statsFile}" not found.`);
  }

  if (env.EXPO_NO_STATS_VALIDATION) {
    return;
  }

  const line = await readFirstLine(statsFile);
  const data = line ? JSON.parse(line) : {};

  if (data.name !== metadata.name || data.version !== metadata.version) {
    throw new Error(`Stats file "${statsFile}" is incompatible with this version of the plugin.`);
  }
}

/**
 * Create or overwrite the stats file with basic metadata.
 * This metdata is used by the API to determine version compatibility.
 */
export async function createStatsFile(projectRoot: string) {
  const filePath = getStatsPath(projectRoot);

  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(getStatsMetdata()) + '\n');
}

/**
 * Add a new stats entry to the stats file.
 * This is appended on a new line, so we can load the stats selectively.
 */
export async function addStatsEntry(projectRoot: string, stats: MetroStatsEntry) {
  // NOTE(cedric): Convert the object to an array to partially read when necessary
  const entry = JSON.stringify([
    stats.platform,
    stats.projectRoot,
    stats.entryPoint,
    stats.preModules,
    stats.graph,
    stats.options,
  ]);

  console.log('Adding stats entry for platform', stats.platform);

  await fs.promises.appendFile(getStatsPath(projectRoot), entry + '\n');
}

/**
 * List all stats entries without parsing the data.
 * This only reads the bundle name, and adds a line number as ID.
 */
export async function listStatsEntries(statsFile: string) {
  const bundlePattern = /^\["([^"]+)","([^"]+)","([^"]+)/;
  const entries: {
    id: number;
    absolutePath: string;
    relativePath: string;
    projectRoot: string;
    platform: 'android' | 'ios' | 'web';
  }[] = [];

  await mapLines(statsFile, (index, line) => {
    if (index === 1) return;

    const [_, platform, projectRoot, entryPoint] = line.match(bundlePattern) ?? [];
    if (platform && projectRoot && entryPoint) {
      entries.push({
        id: index,
        platform: platform as any,
        projectRoot,
        absolutePath: entryPoint,
        relativePath: path.relative(projectRoot, entryPoint),
      });
    }
  });

  return entries;
}

/**
 * Get the stats entry by id or line number, and parse the data.
 */
export async function getStatsEntry(statsFile: string, id: number): Promise<MetroStatsEntry> {
  const line = await readLine(statsFile, id);
  if (!line) {
    throw new Error(`Stats entry "${id}" not found.`);
  }

  const list = JSON.parse(line);
  return {
    platform: list[0],
    projectRoot: list[1],
    entryPoint: list[2],
    preModules: list[3],
    graph: list[4],
    options: list[5],
  };
}
