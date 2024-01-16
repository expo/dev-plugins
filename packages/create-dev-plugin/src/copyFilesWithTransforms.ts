import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';

import type { Transform } from './types';

/**
 * Copy a file from `srcFilePath` to `dstFilePath` and apply the transforms from `transform` to the file.
 */
export async function copyFileWithTransformsAsync(
  srcFilePath: string,
  dstFilePath: string,
  transform: Transform
) {
  let content = await fs.readFile(srcFilePath, 'utf8');
  content = ejs.render(content, transform);

  let basename = path.basename(dstFilePath);
  basename = ejs.render(basename.replace(/^\$/, ''), transform, {
    openDelimiter: '{',
    closeDelimiter: '}',
    escape: (value: string) => value.replace(/\./g, path.sep),
  });
  const targetFilePath = path.join(path.dirname(dstFilePath), basename);

  await fs.writeFile(targetFilePath, content, 'utf8');
  const { mode } = await fs.stat(srcFilePath);
  await fs.chmod(targetFilePath, mode);
}

/**
 * Copy a directory from `srcDirPath` to `dstDirPath` and apply the transforms from `transform` to the files.
 */
export async function copyDirWithTransformsAsync(
  srcDirPath: string,
  dstDirPath: string,
  transform: Transform
) {
  await fs.mkdir(dstDirPath, { recursive: true });

  const entries = await fs.readdir(srcDirPath, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDirPath, entry.name);
    const dstPath = path.join(dstDirPath, entry.name);

    if (entry.isDirectory()) {
      await copyDirWithTransformsAsync(srcPath, dstPath, transform);
    } else {
      await copyFileWithTransformsAsync(srcPath, dstPath, transform);
    }
  }
}
