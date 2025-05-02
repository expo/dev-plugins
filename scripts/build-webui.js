#!/usr/bin/env node

const spawnAsync = require('@expo/spawn-async');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

async function runAsync() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`Usage: ${path.basename(process.argv[1])} package [package2...]`);
    process.exit(1);
  }

  const packageNames = args;
  for (const packageName of packageNames) {
    await buildAsync(packageName);
  }
}

async function buildAsync(packageName) {
  console.log(`⚙️  Building web assets for ${packageName}`);
  const packageRoot = path.join(ROOT, 'packages', packageName);
  await Promise.all([
    fs.promises.rm(path.join(packageRoot, 'dist'), { recursive: true, force: true }),
    fs.promises.rm(path.join(packageRoot, 'webui', 'dist'), { recursive: true, force: true }),
  ]);
  await spawnAsync('npx', ['expo', 'export', '-p', 'web', '--output-dir', 'dist'], {
    cwd: path.join(packageRoot, 'webui'),
  });
  await fs.promises.rename(path.join(packageRoot, 'webui', 'dist'), path.join(packageRoot, 'dist'));
}

(async () => {
  try {
    await runAsync();
  } catch (e) {
    console.error('Uncaught Error', e);
    process.exit(1);
  }
})();
