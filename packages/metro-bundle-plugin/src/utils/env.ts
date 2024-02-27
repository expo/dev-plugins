import { boolish } from 'getenv';

export const env = {
  get EXPO_DEBUG() {
    return boolish('EXPO_DEBUG', false);
  },
  get EXPO_NO_STATS_VALIDATION() {
    return boolish('EXPO_NO_STATS_VALIDATION', false);
  },
};
