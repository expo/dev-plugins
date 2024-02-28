import { Link, useLocalSearchParams } from 'expo-router';

import { useQuery } from '@tanstack/react-query';
import { type MetroStatsModule } from '~plugin/metro/convertGraphToStats';
import { useStatsEntryContext } from '~/providers/stats';
import { CodeBlock, CodeBlockContent, CodeBlockHeader, CodeBlockSection, guessLanguageFromPath } from '~/ui/CodeBlock';

export default function ModulePage() {
  const { entryId } = useStatsEntryContext();
  const { path: absolutePath } = useLocalSearchParams<{ path: string }>();
  const module = useModuleData(entryId, absolutePath);

  if (!module.data) {
    return <div>Module not found</div>;
  }

  return (
    <div className="flex flex-1 flex-col mx-6 my-2 overflow-scroll">
      <Link href="/" className="text-link">
        ← Go Back
      </Link>

      <h1 className="text-slate-50 font-bold text-lg">{module.data.relativePath}</h1>

      <div className="my-4">
        <h2>Imported from</h2>
        <ul style={{ listStyle: 'initial' }}>
          {module.data.inverseDependencies.map((dependencyName) => (
            <li key={dependencyName} className="ml-4">
              {dependencyName}
            </li>
          ))}
        </ul>
      </div>

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
