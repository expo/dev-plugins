import { useDevToolsPluginClient } from 'expo/devtools';

import type { ApolloClientType } from '../types';
import { useApolloClientDevTools } from '../useApolloClientDevTools';

jest.mock('expo/devtools', () => ({
  useDevToolsPluginClient: jest.fn(),
}));

// Run the effect body inline instead of rendering a component.
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (effect: () => unknown) => effect(),
}));

const pluginClient = {
  sendMessage: jest.fn(),
  addMessageListener: jest.fn(() => ({ remove: jest.fn() })),
};

function mockApolloClient(): ApolloClientType {
  return {
    cache: { extract: jest.fn(() => ({})) },
    getObservableQueries: jest.fn(() => new Map()),
    // Private field read by getAllMutations, as on a real client.
    queryManager: { mutationStore: {} },
    __actionHookForDevTools: jest.fn(),
  } as unknown as ApolloClientType;
}

describe('useApolloClientDevTools', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useDevToolsPluginClient as jest.Mock).mockReturnValue(pluginClient);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it.each([undefined, null])('does nothing when the client is %s', (apolloClient) => {
    expect(() => {
      useApolloClientDevTools(apolloClient);
      jest.runAllTimers();
    }).not.toThrow();
    expect(pluginClient.addMessageListener).not.toHaveBeenCalled();
    expect(pluginClient.sendMessage).not.toHaveBeenCalled();
  });

  it('registers listeners and the action hook when given a client', async () => {
    const apolloClient = mockApolloClient();

    useApolloClientDevTools(apolloClient);
    await jest.runAllTimersAsync();
    await Promise.resolve();

    expect(pluginClient.addMessageListener).toHaveBeenCalledWith('GQL:ack', expect.any(Function));
    expect(pluginClient.addMessageListener).toHaveBeenCalledWith(
      'GQL:request',
      expect.any(Function)
    );
    expect(apolloClient.__actionHookForDevTools).toHaveBeenCalledWith(expect.any(Function));
    expect(pluginClient.sendMessage).toHaveBeenCalledWith(
      'GQL:response',
      expect.objectContaining({ queries: [], mutations: [] })
    );
  });
});
