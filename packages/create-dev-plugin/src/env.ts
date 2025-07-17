import getenv from 'getenv';

export const EXPO_BETA = getenv.boolish('EXPO_BETA', false);
