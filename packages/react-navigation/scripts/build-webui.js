const spawnAsync = require('@expo/spawn-async');
const fs = require('fs/promises');
const path = require('path');
const rimraf = require('rimraf');

const PACKAGE_ROOT = path.resolve(__dirname, '..');

async function runAsync() {
  await Promise.all([
    rimraf.rimraf(path.join(PACKAGE_ROOT, 'dist')),
    rimraf.rimraf(path.join(PACKAGE_ROOT, 'webui', 'web-build')),
  ]);
  await spawnAsync('npx', ['expo', 'export:web'], { cwd: path.join(PACKAGE_ROOT, 'webui') });
  await fs.rename(path.join(PACKAGE_ROOT, 'webui', 'web-build'), path.join(PACKAGE_ROOT, 'dist'));
}

(async () => {
  try {
    await runAsync();
  } catch (e) {
    console.error('Uncaught Error', e);
    process.exit(1);
  }
})();
