import { resolveStatsFile } from '~/config';
import { getStatsEntry, validateStatsFile } from '~plugin/metro/readStatsFile';

export async function GET(request: Request, params: Record<'entry', string>) {
  const statsFile = resolveStatsFile();

  try {
    await validateStatsFile(statsFile);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const entryId = params.entry ? parseInt(params.entry, 10) : null;
  if (!entryId || Number.isNaN(entryId) || entryId <= 1) {
    return Response.json({ error: `Stats entry "${params.entry}" not found.`});
  }

  return Response.json(await getStatsEntry(statsFile, entryId));
}
