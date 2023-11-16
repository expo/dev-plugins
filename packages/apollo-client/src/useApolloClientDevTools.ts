import type { DocumentNode } from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

import type {
  ApolloClientState,
  ApolloClientType,
  ArrayOfMutations,
  ArrayOfQuery,
  MutationData,
} from './types';
import { getQueries } from './utils';

let tick = 0;

export function useApolloClientDevTools(apolloClient: ApolloClientType) {
  const client = useDevToolsPluginClient('apollo-client');

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    async function setup() {
      let acknowledged = true;
      let apolloData: null | ApolloClientState = await getCurrentState(apolloClient);

      const sendData = () =>
        void {
          if(apolloData) {
            subscriptions.push(client?.sendMessage('GQL:response', apolloData));
            acknowledged = false;
            apolloData = null;
          },
        };

      const logger = async (): Promise<void> => {
        if (acknowledged) {
          apolloData = await getCurrentState(apolloClient);
          sendData();
        }
      };

      subscriptions.push(
        client?.addMessageListener('GQL:ack', () => {
          acknowledged = true;
          sendData();
        })
      );

      subscriptions.push(
        client?.addMessageListener('GQL:request', async () => {
          client?.sendMessage('GQL:response', await getCurrentState(apolloClient));
        })
      );

      apolloClient.__actionHookForDevTools(debounce(() => logger()));

      client?.sendMessage('GQL:response', apolloData);
    }

    setup();

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client, apolloClient]);
}

function getTime(): string {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}

function extractQueries(client: ApolloClientType): Map<any, any> {
  // @ts-expect-error queryManager is private method
  if (!client || !client.queryManager) {
    return new Map();
  }
  // @ts-expect-error queryManager is private method
  return client.queryManager.queries;
}

function getAllQueries(client: ApolloClientType): ArrayOfQuery {
  const queryMap = extractQueries(client);
  const allQueries = getQueries(queryMap);
  return allQueries;
}

type MutationObject = {
  mutation: DocumentNode;
  variables: object;
  loading: boolean;
  error: object;
};
function getMutationData(allMutations: Record<string, MutationObject>): Array<MutationData> {
  return [...Object.keys(allMutations)]?.map((key) => {
    const { mutation, variables, loading, error } = allMutations[key];

    return {
      id: key,
      name: getOperationName(mutation),
      variables,
      loading,
      error,
      body: mutation?.loc?.source?.body,
    };
  });
}

function getAllMutations(client: ApolloClientType): ArrayOfMutations {
  // @ts-expect-error private method
  const allMutations = client.queryManager.mutationStore || {};

  const final = getMutationData(allMutations);

  return final;
}

function getCurrentState(client: ApolloClientType): Promise<ApolloClientState> {
  tick++;

  let currentState: ApolloClientState;

  return new Promise((res) => {
    setTimeout(() => {
      currentState = {
        id: tick,
        lastUpdateAt: getTime(),
        queries: getAllQueries(client),
        mutations: getAllMutations(client),
        cache: client.cache.extract(true),
      };
      res(currentState);
    }, 0);
  }).then(() => {
    return currentState;
  });
}

function debounce(func: (...args: any) => any, timeout = 500): () => any {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-expect-error add typings for this
      func.apply(this, args);
    }, timeout);
  };
}
