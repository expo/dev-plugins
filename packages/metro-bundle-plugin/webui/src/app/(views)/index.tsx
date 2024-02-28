import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { StatsModuleFilter } from '~/components/forms/StatsModuleFilter';
import { TreemapGraph } from '~/components/graphs/TreemapGraph';
import {
  type ModuleFilters,
  useModuleFilterContext,
  filtersToUrlParams,
} from '~/providers/modules';
import { useStatsEntryContext } from '~/providers/stats';
import { type PartialModule } from '~/app/api/stats/[entry]/modules/index+api';
import { useMemo } from 'react';
import { formatFileSize } from '~/utils/formatString';
import { Page, PageHeader, PageTitle } from '~/ui/Page';

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
      <PageHeader>
        <PageTitle>
          <h1 className="text-lg font-bold mr-4">Bundle</h1>
          {graph.data?.length && <BundleSummary modules={graph.data} />}
        </PageTitle>
        <StatsModuleFilter />
      </PageHeader>
      <TreemapGraph
        key={`bundle-graph-${entryId}`}
        modules={graph.data ?? []}
        onModuleClick={onInspectModule}
      />
    </div>
  );
}

function BundleSummary({ modules }: { modules: PartialModule[] }) {
  const totalModules = useMemo(() => `${modules.length} ${modules.length === 1 ? 'module' : 'modules'}`, [modules]);
  const totalSize = useMemo(
    () => formatFileSize(modules.reduce((size, module) => size + module.size, 0)),
    [modules]
  );

  return (
    <div className="font-sm text-secondary">
      <span>{totalModules}</span>
      <span className="text-tertiary mx-2 select-none">—</span>
      <span>{totalSize}</span>
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

      return fetch(url).then((res) => res.json());
    },
  });
}
