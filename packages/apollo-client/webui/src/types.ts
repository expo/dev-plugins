import type { ArrayOfMutations, ArrayOfQuery } from '../../src/types';

export type TabItemType = { id: string; name: string | null };

export type RawMutationBody = {
  id: string;
  name: string | null;
  body: string;
  variables: object;
};

export type RawQueryBody = {
  id: string;
  name: string | null;
  cachedData: object;
};

export type RawData = {
  id: string;
  lastUpdateAt: Date;
  queries: ArrayOfQuery;
  mutations: ArrayOfMutations;
  cache: Array<BlockType>;
};

export type Data = {
  id: string;
  lastUpdateAt: Date;
  queries: Array<BlockType>;
  mutations: Array<BlockType>;
  cache: Array<BlockType>;
};

export type Events = {
  'GQL:response': RawData;
  'GQL:request': Data;
  'GQL:ack': boolean;
};

export type BlockType = {
  id?: string;
  operationType?: string;
  name?: string | null;
  blocks?: Array<{
    blockType: string;
    blockLabel: string;
    blockValue: any;
  }>;
};
