import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { getStatsEntry } from '~plugin/metro/readStatsFile';

type StatsContext = {
  entryId: number;
  setEntryId: (id: number) => void;
  entries?: ReturnType<typeof useStatsEntries>;
};

export const statsContext = createContext<StatsContext>({ 
  entryId: 2,
  setEntryId: () => {},
  entries: undefined,
});

export const useStatsContext = () => useContext(statsContext);

export function StatsProvider({ children }: PropsWithChildren) {
  const [entryId, setEntryId] = useState(2);
  const entries = useStatsEntries();
  
  return (
    <statsContext.Provider value={{ entryId, setEntryId, entries }}>
      {children}
    </statsContext.Provider>
  )
}

function useStatsEntries() {
  return useQuery<ReturnType<typeof getStatsEntry>>({
    queryKey: ['stats-entries'],
    queryFn: () => fetch('/api/stats').then((res) => res.json()),
  });
}
