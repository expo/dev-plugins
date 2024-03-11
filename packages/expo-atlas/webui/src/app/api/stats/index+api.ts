import { resolveStatsFile } from '~/config';
import { listStatsEntries, validateStatsFile } from '~plugin/metro/serializeStatsFile';

export async function GET() {
  const statsFile = resolveStatsFile();

  try {
    await validateStatsFile(statsFile);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(await listStatsEntries(statsFile));
}
