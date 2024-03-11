import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { listStatsEntries } from '~plugin/metro/serializeStatsFile';

export type StatsEntry = Awaited<ReturnType<typeof listStatsEntries>>[0];

type StatsEntryContext = {
  entryId: number;
  setEntryId: (id: number) => void;
  entries?: ReturnType<typeof useStatsEntriesData>;
  entry?: StatsEntry;
};

export const statsEntryContext = createContext<StatsEntryContext>({
  entryId: 2,
  setEntryId: () => {},
  entries: undefined,
  entry: undefined,
});

export const useStatsEntryContext = () => useContext(statsEntryContext);

export function StatsEntryProvider({ children }: PropsWithChildren) {
  const entries = useStatsEntriesData();
  const [entryId, setEntryId] = useState(2);
  const entry = useMemo(
    () => entries.data?.find((entry) => entry.id === entryId),
    [entries, entryId]
  );
  
  return (
    <statsEntryContext.Provider value={{ entryId, setEntryId, entries, entry }}>
      {children}
    </statsEntryContext.Provider>
  );
}

/** Load all available stats entries from API */
function useStatsEntriesData() {
  return useQuery<StatsEntry[]>({
    queryKey: ['stats-entries'],
    queryFn: () => fetch('/api/stats').then((res) => res.json()),
  });
}
