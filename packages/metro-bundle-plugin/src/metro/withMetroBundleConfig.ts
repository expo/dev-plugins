import { type MetroConfig } from 'metro-config';
import { convertGraphToStats } from './convertGraphToStats';
import { addStatsEntry, createStatsFile } from './createStatsFile';

export function withMetroBundleConfig(config: MetroConfig) {
  if (!config.projectRoot) {
    throw new Error('No "projectRoot" configured in Metro config.');
  }

  const originalSerializer = config.serializer?.customSerializer ?? (() => {});
  const projectRoot = config.projectRoot;

  // Note(cedric): we don't have to await this, Metro would never bundle before this is finisheds
  createStatsFile(projectRoot);

  // @ts-expect-error
  config.serializer.customSerializer = (entryPoint, preModules, graph, options) => {
    addStatsEntry(projectRoot, convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options }));
    return originalSerializer(entryPoint, preModules, graph, options);
  };

  return config;
}
