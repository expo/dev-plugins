import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { TreemapGraph } from '~/components/TreemapGraph';
import { type MetroStatsEntry } from '~plugin/metro/convertGraphToStats';

const entryId = 2;

export default function GraphScreen() {
  const stats = useStatsData(entryId);
  const modules = useMemo(() => stats.data?.[2].dependencies ?? [], [stats.data]);

  if (stats.isLoading) {
    return <div>Hang on!</div>;
  }

  return (
    <TreemapGraph key={`bundle-graph-${entryId}`} modules={modules} />
  );
}

function useStatsData(entry: number) {
  return useQuery<MetroStatsEntry>({
    queryKey: [`bundle-graph-${entry}`],
    queryFn: () => fetch(`/api/stats/${entry}`).then((res) => res.json()),
  });
}
