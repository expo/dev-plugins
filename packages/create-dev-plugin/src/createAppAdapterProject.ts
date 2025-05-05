import spawnAsync from '@expo/spawn-async';
import path from 'path';

import { copyDirWithTransformsAsync } from './copyFilesWithTransforms';
import { EXPO_BETA } from './env';
import { installDependenciesAsync, type PackageManagerName } from './resolvePackageManager';
import type { ProjectInfo } from './types';

const TEMPLATE_ROOT = path.join(__dirname, '..', 'templates', 'app-adapter');

const debug = require('debug')('create-dev-plugin:createAppAdapterProject') as typeof console.log;

export async function createAppAdapterProjectAsync(
  projectRoot: string,
  projectInfo: ProjectInfo,
  packageManager: PackageManagerName
) {
  const packageVersions = await queryExpoPackageVersionAsync();
  debug(`Using expo package versions: ${packageVersions.expoPackageVersion}`);

  const transform = { project: projectInfo, ...packageVersions, packageManager };
  await copyDirWithTransformsAsync(TEMPLATE_ROOT, projectRoot, transform);

  debug(`Installing packages by ${packageManager}`);
  await installDependenciesAsync(projectRoot, packageManager, { silent: true });
}

export async function queryExpoPackageVersionAsync(): Promise<{
  expoPackageVersion: string;
  reactPackageVersion: string;
  typesReactPackageVersion: string;
}> {
  const distTag = EXPO_BETA ? 'next' : 'latest';
  const { stdout } = await spawnAsync('npm', [
    'view',
    `expo-template-default@${distTag}`,
    'dependencies',
    'devDependencies',
    '--json',
  ]);
  const { dependencies, devDependencies } = JSON.parse(stdout);
  return {
    expoPackageVersion: dependencies['expo'],
    reactPackageVersion: dependencies['react'],
    typesReactPackageVersion: devDependencies['@types/react'],
  };
}
