import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { TreemapGraph } from '~/components/graphs/TreemapGraph';
import { LoadingIndicator } from '~/components/indicators/Loading';
import { useStatsContext } from '~/providers/stats';
import { type MetroStatsEntry } from '~plugin/metro/convertGraphToStats';

export default function GraphScreen() {
  const { entryId } = useStatsContext();
  const modules = useStatsModules(entryId);
  const router = useRouter();

  if (modules.isLoading) {
    return <LoadingIndicator />;
  }

  // TODO(cedric): improve error handling
  if (!modules.data) {
    return <div>No data found</div>;
  }

  function onInspectModule(absolutePath: string) {
    router.push({
      pathname: '/modules/[path]',
      params: { path: absolutePath },
    });
  }

  return (
    <>
      <TreemapGraph
        key={`bundle-graph-${entryId}`}
        modules={modules.data}
        onModuleClick={onInspectModule}
      />
    </>
  );
}

// TODO(cedric): move to dedicated file
export function useStatsModules(entry: number) {
  return useQuery<MetroStatsEntry[2]['dependencies']>({
    queryKey: [`bundle-graph-${entry}`],
    queryFn: () => (
      fetch(`/api/stats/${entry}/bundle-graph`)
        .then((res) => res.json())
    ),
  });
}
