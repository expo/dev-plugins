#!/usr/bin/env node
import arg from 'arg';
import open from 'open';

import { createServer } from './server';
import { resolveOptions } from './resolveOptions';

export type Input = typeof args;

const args = arg({
  // Types
  '--help': Boolean,
  '--port': Number,
  '--version': Boolean,
  // Aliases
  '-h': '--help',
  '-p': '--port',
  '-v': '--version',
});

if (args['--version']) {
  console.log(require('../package.json').version);
  process.exit(0);
}

if (args['--help']) {
  console.log(`
    Usage
      $ metro-bundle-plugin [statsFile]

    Options
      --port, -p      Port to listen on
      --help, -h      Displays this message
      --version, -v   Displays the current version
  `);
  process.exit(0);
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

run();

async function run() {
  const options = await resolveOptions(args);
  const server = createServer(options);

  server.listen(options.port, () => {
    const href = `http://localhost:${options.port}`;

    console.log(`Metro bundle inspector is ready on ${href}`);
    console.log('Loaded stats file:');
    console.log(`  ${options.statsFile}`);
    open(href);
  });
}
