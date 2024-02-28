import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { StatsModuleFilter } from '~/components/forms/StatsModuleFilter';
import { TreemapGraph } from '~/components/graphs/TreemapGraph';
import { type ModuleFilters, useModuleFilterContext, filtersToUrlParams } from '~/providers/modules';
import { useStatsEntryContext } from '~/providers/stats';
import { type PartialModule } from '~/app/api/stats/[entry]/modules/index+api';

export default function GraphScreen() {
  const { entryId } = useStatsEntryContext();
  const { filters } = useModuleFilterContext();

  const graph = useBundleGraphData(entryId, filters);
  const router = useRouter();

  function onInspectModule(absolutePath: string) {
    router.push({
      pathname: '/modules/[path]',
      params: { path: absolutePath },
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-right my-2 px-8">
        <StatsModuleFilter />
      </div>
      <TreemapGraph
        key={`bundle-graph-${entryId}`}
        modules={graph.data ?? []}
        onModuleClick={onInspectModule}
      />
    </div>
  );
}

/** Load the bundle graph data from API, with default or custom filters */
function useBundleGraphData(entry: number, filters?: ModuleFilters) {
  return useQuery<PartialModule[]>({
    queryKey: [`bundle-graph`, entry, filters],
    queryFn: ({ queryKey }) => {
      const [_key, entry, filters] = queryKey as [string, number, ModuleFilters | undefined];
      const url = !!filters
        ? `/api/stats/${entry}/modules?${filtersToUrlParams(filters)}`
        : `/api/stats/${entry}/modules`;

      return fetch(url).then((res) => res.json())
    },
  });
}
