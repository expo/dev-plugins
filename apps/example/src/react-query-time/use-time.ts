import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type Time = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string;
  dst_offset: number;
  dst_until: string;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

export const timeByCurrentIpQueryKey = () => ['time-by-current-ip'];

export type UseTimeByCurrentIpOptions = Omit<
  UseQueryOptions<Time, Error, Time>,
  'queryKey' | 'queryFn'
>;

export function useTimeByCurrentIp(options?: UseTimeByCurrentIpOptions) {
  return useQuery<Time, Error, Time>({
    queryKey: timeByCurrentIpQueryKey(),
    queryFn: async function getTimeByCurrentIp() {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      if (!response.ok) {
        throw new Error('Failed to fetch time by current IP.');
      }

      return response.json();
    },
    ...options,
  });
}

export const timeByTimeZoneQueryKey = (zone: string) => ['time-by-time-zone', zone];

export type UseTimeByTimeZoneOptions = Omit<
  UseQueryOptions<Time, Error, Time>,
  'queryKey' | 'queryFn'
>;

export function useTimeByTimeZone(zone: string, options?: UseTimeByTimeZoneOptions) {
  return useQuery<Time, Error, Time>({
    queryKey: timeByTimeZoneQueryKey(zone),
    queryFn: async function getTimeByTimeZone() {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
      if (!response.ok) {
        throw new Error('Failed to fetch time by current IP.');
      }

      return response.json();
    },
    ...options,
  });
}
