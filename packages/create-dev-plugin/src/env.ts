import getenv from 'getenv';

// FIXME: disable default BETA when SDK 50 is officially released.
export const EXPO_BETA = getenv.boolish('EXPO_BETA', true);
