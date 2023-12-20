import spawnAsync from '@expo/spawn-async';
import path from 'path';

import { copyDirWithTransformsAsync } from './copyFilesWithTransforms';
import { EXPO_BETA } from './env';
import type { ProjectInfo } from './types';
import { installDependenciesAsync, type PackageManagerName } from './resolvePackageManager';

const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates', 'app-adapter');

const debug = require('debug')('create-dev-plugin:createAppAdapterProject') as typeof console.log;

export async function createAppAdapterProjectAsync(
  projectRoot: string,
  projectInfo: ProjectInfo,
  packageManager: PackageManagerName
) {
  const expoPackageVersion = await queryExpoPackageVersionAsync();
  debug(`Using expo package version: ${expoPackageVersion}`);

  const transform = { project: projectInfo, expoPackageVersion };
  await copyDirWithTransformsAsync(TEMPLATE_ROOT, projectRoot, transform);

  debug(`Installing packages by ${packageManager}`);
  await installDependenciesAsync(projectRoot, packageManager, { silent: true });
}

export async function queryExpoPackageVersionAsync() {
  const distTag = EXPO_BETA ? 'next' : 'latest';
  const { stdout } = await spawnAsync('npm', [
    'view',
    `expo-template-blank@${distTag}`,
    'dependencies',
    '--json',
  ]);
  const dependencies = JSON.parse(stdout);
  return dependencies['expo'];
}
