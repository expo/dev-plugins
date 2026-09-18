import { parse } from 'graphql';

import { getObservableQueriesList, getOperationName } from '../utils';

describe('getOperationName', () => {
  it('returns the named operation', () => {
    const document = parse('query GetUser { user { id } }');
    expect(getOperationName(document)).toBe('GetUser');
  });

  it('returns null for anonymous operations', () => {
    const document = parse('{ user { id } }');
    expect(getOperationName(document)).toBeNull();
  });
});

describe('getObservableQueriesList', () => {
  it('normalizes a Map (Apollo Client v3 shape)', () => {
    const map = new Map([['1', 'a']]);
    expect(getObservableQueriesList(map as any)).toEqual(['a']);
  });

  it('normalizes a Set (Apollo Client v4 shape)', () => {
    const set = new Set(['a']);
    expect(getObservableQueriesList(set as any)).toEqual(['a']);
  });
});
