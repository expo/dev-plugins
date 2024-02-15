import type { Query, QueryStatus } from '@tanstack/react-query';

export type SerializedQuery = Query & {
  _ext_isActive: boolean;
  _ext_isStale: boolean;
  _ext_observersCount: number;
};

export type ExtendedQuery = SerializedQuery & {
  key: string;
  status: QueryStatus;
  dataUpdateCount: number;
  observersCount: number;
  isQueryActive: boolean;
};
