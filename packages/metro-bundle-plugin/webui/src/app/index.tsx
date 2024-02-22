import { useQuery } from '@tanstack/react-query';
import { TreemapGraph } from '~/components/TreemapGraph';
import { useStatsContext } from '~/providers/stats';
import { type MetroStatsEntry } from '~plugin/metro/convertGraphToStats';

export default function GraphScreen() {
  const { entryId } = useStatsContext();
  const modules = useStatsModules(entryId);

  if (modules.isLoading) {
    return <div>Hang on!</div>;
  }

  if (!modules.data) {
    return <div>No data found</div>;
  }

  return (
    <TreemapGraph key={`bundle-graph-${entryId}`} modules={modules.data} />
  );
}

function useStatsModules(entry: number) {
  return useQuery<MetroStatsEntry[2]['dependencies']>({
    queryKey: [`bundle-graph-${entry}`],
    queryFn: () => (
      fetch(`/api/stats/${entry}/bundle-graph`)
        .then((res) => res.json())
    ),
  });
}
