// import { Link, useLocalSearchParams } from 'expo-router';
// import { useStatsContext } from '~/providers/stats';
// import { useMemo } from 'react';
// import { type MetroStatsEntry } from '~plugin/metro/convertGraphToStats';

export default function ModulePage() {
  return <div>todo</div>;
  // const { entryId } = useStatsContext();
  // const modules = useStatsModules(entryId);

  // const { path: absolutePath } = useLocalSearchParams<{ path: string }>();
  // const module = useMemo(() => findModule(modules.data, absolutePath), [modules.data, absolutePath]);

  // if (!module) {
  //   return <div>Module not found</div>;
  // }

  // return (
  //   <div className="flex flex-1 flex-col mx-4 my-2">
  //     <Link href="/" className="text-link">
  //       ← Go Back
  //     </Link>

  //     <h1 className="text-slate-50 font-bold text-lg">{module.relativePath}</h1>

  //     <div className="my-4">
  //       <h2>Imported from</h2>
  //       <ul style={{ listStyle: 'initial' }}>
  //         {module.inverseDependencies.map((dependencyName) => (
  //           <li key={dependencyName} className="ml-4">{dependencyName}</li>
  //         ))}
  //       </ul>
  //     </div>

  //     <div className="flex flex-row">
  //       <div className="flex-1">
  //         <p className="flex text-slate-50 font-bold text-lg">Source</p>
  //         <pre className="text-default ">{module.source}</pre>
  //       </div>
  //       <div className="flex-1">
  //         <p className="flex text-slate-50 font-bold text-lg">Output</p>
  //         <pre className="text-default ">{module.output.map(((data) => data.data.code)).join()}</pre>
  //       </div>
  //     </div>
  //   </div>
  // );
}

// function findModule(modules: MetroStatsEntry[2]['dependencies'] | undefined, absolutePath: string) {
//   if (modules) {
//     return modules.find((module) => module.absolutePath === absolutePath);
//   }

//   return null;
// }
