import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { listStatsEntries } from '~plugin/metro/readStatsFile';

type StatsEntryContext = {
  entryId: number;
  setEntryId: (id: number) => void;
  entries?: ReturnType<typeof useStatsEntriesData>;
};

export const statsEntryContext = createContext<StatsEntryContext>({ 
  entryId: 2,
  setEntryId: () => {},
  entries: undefined,
});

export const useStatsEntryContext = () => useContext(statsEntryContext);

export function StatsEntryProvider({ children }: PropsWithChildren) {
  const entries = useStatsEntriesData();
  const [entryId, setEntryId] = useState(2);
  
  return (
    <statsEntryContext.Provider value={{ entryId, setEntryId, entries }}>
      {children}
    </statsEntryContext.Provider>
  )
}

/** Load all available stats entries from API */
function useStatsEntriesData() {
  return useQuery<Awaited<ReturnType<typeof listStatsEntries>>>({
    queryKey: ['stats-entries'],
    queryFn: () => fetch('/api/stats').then((res) => res.json()),
  });
}
