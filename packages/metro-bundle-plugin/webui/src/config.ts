import { getStatsPath } from '~plugin/metro/createStatsFile';

export function resolveStatsFile() {
  // Note(cedric): avoid inlining this value by desctructuring it
  const { EXPO_METRO_BUNDLE_STATS_FILE } = process.env;

  if (EXPO_METRO_BUNDLE_STATS_FILE) {
    return EXPO_METRO_BUNDLE_STATS_FILE;
  }

  // Fall back to the default location from CWD
  const projectRoot = process.cwd();
  return getStatsPath(projectRoot);
}
