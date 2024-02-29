import fs from 'fs';
import path from 'path';

import { getStatsPath } from '../metro/serializeStatsFile';
import { type Input } from './bin';
import { validateStatsFile } from '../metro/serializeStatsFile';
import { getFreePort } from '../utils/port';

export type Options = Awaited<ReturnType<typeof resolveOptions>>;

export async function resolveOptions(input: Input) {
  const [statsFile, port] = await Promise.all([
    resolveStatsFile(input),
    resolvePort(input),
  ]);

  return { statsFile, port };
}

async function resolveStatsFile(input: Input) {
  const statsFile = input._[0] ?? getStatsPath(process.cwd());

  if (!fs.existsSync(statsFile)) {
    throw new Error(`Could not find stats file "${statsFile}".`);
  }

  try {
    await validateStatsFile(statsFile);
  } catch (error) {
    throw new Error(`Stats file is incompatible with this version.`);
  }

  return path.resolve(statsFile);
}

async function resolvePort(input: Pick<Input, '--port'>) {
  return input['--port'] ?? await getFreePort(3000);
}
