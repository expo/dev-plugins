#!/usr/bin/env node

const spawnAsync = require('@expo/spawn-async');
const path = require('path');
const rimraf = require('rimraf');

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
  await rimraf.rimraf(path.join(packageRoot, 'dist'));
  await spawnAsync('npx', ['expo', 'export', '-p', 'web', '--output-dir', '../dist'], {
    cwd: path.join(packageRoot, 'webui'),
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
