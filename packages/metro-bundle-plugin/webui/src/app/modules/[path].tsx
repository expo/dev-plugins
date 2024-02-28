import { Link, useLocalSearchParams } from 'expo-router';

import { useQuery } from '@tanstack/react-query';
import { type MetroStatsModule } from '~plugin/metro/convertGraphToStats';
import { useStatsEntryContext } from '~/providers/stats';
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockSection,
  guessLanguageFromPath,
} from '~/ui/CodeBlock';
import { PageHeader, PageTitle } from '~/ui/Page';
import { formatFileSize } from '~/utils/formatString';
import { useMemo } from 'react';

export default function ModulePage() {
  const { entryId } = useStatsEntryContext();
  const { path: absolutePath } = useLocalSearchParams<{ path: string }>();
  const module = useModuleData(entryId, absolutePath);

  if (!module.data) {
    return <div>Module not found</div>;
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <PageHeader>
        <PageTitle>
          <h1 className="text-slate-50 font-bold text-lg mr-4" title={module.data.absolutePath}>
            {module.data.relativePath}
          </h1>
          <ModuleSummary module={module.data} />
        </PageTitle>
      </PageHeader>

      <div className="mx-8">
        <h2>Imported from</h2>
        <ul style={{ listStyle: 'initial' }} className="mb-6">
          {module.data.inverseDependencies.map(({ absolutePath, relativePath }) => (
            <li key={absolutePath} className="ml-4">
              <Link
                className="text-link hover:underline"
                href={{ pathname: '/modules/[path]', params: { path: absolutePath } }}>
                {relativePath}
              </Link>
            </li>
          ))}
        </ul>

        <CodeBlock>
          <CodeBlockSection>
            <CodeBlockHeader>Source</CodeBlockHeader>
            <CodeBlockContent language={guessLanguageFromPath(module.data.relativePath)}>
              {module.data.source}
            </CodeBlockContent>
          </CodeBlockSection>
          <CodeBlockSection>
            <CodeBlockHeader>Output</CodeBlockHeader>
            <CodeBlockContent>
              {module.data.output.map((output) => output.data.code).join()}
            </CodeBlockContent>
          </CodeBlockSection>
        </CodeBlock>
      </div>
    </div>
  );
}

function ModuleSummary({ module }: { module: MetroStatsModule }) {
  const inputSize = useMemo(() => formatFileSize(module.size), [module.size]);

  return (
    <div className="font-sm text-secondary">
      <span>module</span>
      <span className="text-tertiary mx-2 select-none">—</span>
      <span>{inputSize}</span>
    </div>
  );
}

/** Load the module data from API, by path reference only */
function useModuleData(entry: number, path: string) {
  return useQuery<MetroStatsModule>({
    queryKey: [`module`, entry, path],
    queryFn: ({ queryKey }) => {
      const [_key, entry, path] = queryKey as [string, number, string];
      return fetch(`/api/stats/${entry}/modules`, {
        method: 'POST',
        body: JSON.stringify({ path }),
      }).then((res) => res.json());
    },
  });
}
