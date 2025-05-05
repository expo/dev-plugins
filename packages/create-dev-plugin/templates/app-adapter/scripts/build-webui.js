#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

async function runAsync() {
  await spawnAsync('npx', ['expo', 'export', '-p', 'web', '--output-dir', 'dist'], {
    cwd: path.join(projectRoot, 'webui'),
  });

  // [1] Remove dist if it exists
  const distPath = path.join(projectRoot, 'dist');
  try {
    await fs.rm(distPath, { recursive: true, force: true });
  } catch {}

  // [2] Move dist from webui
  const srcDist = path.join(projectRoot, 'webui', 'dist');
  await fs.rename(srcDist, distPath);
}

async function spawnAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: true, ...options });
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

(async () => {
  try {
    await runAsync();
  } catch (error) {
    console.error('Error during build-webui:', error);
    process.exit(1);
  }
})();
