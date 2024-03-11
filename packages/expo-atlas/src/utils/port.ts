import freeport from 'freeport-async';

/**
 * Find the closest free port to the given port number.
 * This will increase the port until a free port has been found.
 */
export async function getFreePort(portStart: number): Promise<number> {
  const port = await freeport(portStart, { hostnames: [null, 'localhost'] });
  if (!port) {
    throw new Error(`Could not find a free port starting from ${portStart}.`);
  }
  return port;
}
