import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

export type ModuleFilters = {
  /** The types of modules to show */
  types: ('project' | 'node_modules')[];
  /** An optional inclusion glob pattern */
  include?: string;
  /** An optional exclusion glob pattern */
  exclude?: string;
};

const DEFAULT_FILTERS: ModuleFilters = {
  types: ['project', 'node_modules'],
};

type ModuleFilterContext = {
  filters: ModuleFilters;
  setFilters: (action: Partial<ModuleFilters>) => void;
};

export const moduleFilterContext = createContext<ModuleFilterContext>({
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
});

export function ModuleFilterProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useReducer(reducer, DEFAULT_FILTERS);

  return (
    <moduleFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </moduleFilterContext.Provider>
  );
}

export const useModuleFilterContext = () => useContext(moduleFilterContext);

/** Keep track of the filters and update non-undefined properties */
function reducer(state: ModuleFilters, action: Partial<ModuleFilters>): ModuleFilters {
  const nextState = { ...state };

  if (action.types !== undefined) nextState.types = action.types;
  if (action.include !== undefined) nextState.include = action.include;
  if (action.exclude !== undefined) nextState.exclude = action.exclude;

  return nextState;
}

/** Convert the current filters to query parameters */
export function filtersToUrlParams(state: ModuleFilters) {
  const params = new URLSearchParams({
    modules: state.types.join(','),
  });

  if (state.include) params.set('include', state.include);
  if (state.exclude) params.set('exclude', state.exclude);

  return params.toString();
}

/** Convert the query paramters to filters */
export function filtersFromUrlParams(params: URLSearchParams) {
  const filters = { ...DEFAULT_FILTERS };

  const modulesParam = params.get('modules');
  const includeParam = params.get('include');
  const excludeParam = params.get('exclude');

  if (modulesParam) filters.types = modulesParam.split(',') as ModuleFilters['types'];
  if (includeParam) filters.include = includeParam;
  if (excludeParam) filters.exclude = excludeParam;

  return filters;
}
