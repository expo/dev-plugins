#!/usr/bin/env node

const spawnAsync = require('@expo/spawn-async');
const fs = require('fs/promises');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

async function runAsync() {
  const packageNames = (await fs.readdir(path.join(ROOT, 'packages'))).filter((name) =>
    shouldPreparePackageAsync(name)
  );

  for (const packageName of packageNames) {
    await prepareAsync(packageName);
  }
}

async function shouldPreparePackageAsync(packageName) {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(ROOT, 'packages', packageName, 'package.json'), 'utf8')
  );
  return !!packageJson.scripts?.prepare;
}

async function prepareAsync(packageName) {
  console.log(`⚙️  Preparing package - ${packageName}`);
  const packageRoot = path.join(ROOT, 'packages', packageName);
  await spawnAsync('yarn', ['prepare'], {
    cwd: packageRoot,
  });
}

(async () => {
  try {
    await runAsync();
  } catch (e) {
    console.error('Uncaught Error', e);
    process.exit(1);
  }
})();
