import padStart from 'lodash/padStart';
import { nanoid } from 'nanoid';

import type { SerializedQuery } from '../types';

export function formatTimestamp(timestamp: number): string {
  if (timestamp === 0) {
    return '-';
  }

  const date = new Date(timestamp);

  return `${padStart(date.getHours().toString(), 2, '0')}:${padStart(
    date.getMinutes().toString(),
    2,
    '0'
  )}:${padStart(date.getSeconds().toString(), 2, '0')}.${padStart(
    date.getMilliseconds().toString(),
    3,
    '0'
  )}`;
}

export function getObserversCounter(query: SerializedQuery): number {
  return query._ext_observersCount;
}

export function isQueryActive(query: SerializedQuery): boolean {
  return query._ext_isActive;
}

function isStale(query: SerializedQuery): boolean {
  const hasStaleObserver = query._ext_isStale;
  const hasInvalidState = query.state.isInvalidated || !query.state.dataUpdatedAt;

  return hasStaleObserver || hasInvalidState;
}

function isInactive(query: SerializedQuery): boolean {
  return getObserversCounter(query) === 0;
}

export function getQueryStatusLabel(query: SerializedQuery): string {
  return query.state.fetchStatus === 'fetching'
    ? 'fetching'
    : isInactive(query)
      ? 'inactive'
      : query.state.fetchStatus === 'paused'
        ? 'paused'
        : isStale(query)
          ? 'stale'
          : 'fresh';
}
