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
import { formatFileSize } from '~/utils/formatString';
import { PageHeader, PageTitle } from '~/ui/Page';
import { Tag } from '~/ui/Tag';

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
          {!!graph.data && <BundleSummary data={graph.data} />}
        </PageTitle>
        <StatsModuleFilter />
      </PageHeader>
      <TreemapGraph
        key={`bundle-graph-${entryId}`}
        modules={graph.data?.data?.modules ?? []}
        onModuleClick={onInspectModule}
      />
    </div>
  );
}

function BundleSummary({ data }: { data: ModulesAPIResponse }) {
  return (
    <div className="font-sm text-secondary inline-block">
      <Tag variant={data.metadata.platform} />
      <span className="text-tertiary mx-2 select-none">-</span>
      <span>{data.metadata.modulesCount} modules</span>
      <span className="text-tertiary mx-2 select-none">-</span>
      <span>{formatFileSize(data.metadata.size)}</span>
      {data.metadata.modulesCount !== data.data.modulesCount && (
        <div className="text-tertiary italic inline">
          <span className="mx-2 select-none">—</span>
          <span className="mr-2 select-none italic ">filtered:</span>
          <span>{data.data.modulesCount} modules</span>
          <span className="mx-2 select-none">-</span>
          <span>{formatFileSize(data.data.size)}</span>
        </div>
      )}
    </div>
  );
}

type ModulesAPIResponse = {
  metadata: {
    platform: 'android' | 'ios' | 'web',
    size: number,
    modulesCount: number,
  };
  data: {
    size: number;
    modulesCount: number;
    modules: PartialModule[];
  };
};

/** Load the bundle graph data from API, with default or custom filters */
function useBundleGraphData(entry: number, filters?: ModuleFilters) {
  return useQuery<ModulesAPIResponse>({
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
