import { getOperationName } from '@apollo/client/utilities';
import { useDevToolsPluginClient } from 'expo/devtools';
import { useEffect } from 'react';
import { getQueries } from './utils';
let tick = 0;
export function useApolloClientDevTools(apolloClient) {
    const client = useDevToolsPluginClient('apollo-client');
    useEffect(() => {
        const subscriptions = [];
        async function setup() {
            let acknowledged = true;
            let apolloData = await getCurrentState(apolloClient);
            const sendData = () => void {
                if(apolloData) {
                    subscriptions.push(client?.sendMessage('GQL:response', apolloData));
                    acknowledged = false;
                    apolloData = null;
                },
            };
            const logger = async () => {
                if (acknowledged) {
                    apolloData = await getCurrentState(apolloClient);
                    sendData();
                }
            };
            subscriptions.push(client?.addMessageListener('GQL:ack', () => {
                acknowledged = true;
                sendData();
            }));
            subscriptions.push(client?.addMessageListener('GQL:request', async () => {
                client?.sendMessage('GQL:response', await getCurrentState(apolloClient));
            }));
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
function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}
function extractQueries(client) {
    // @ts-expect-error queryManager is private method
    if (!client || !client.queryManager) {
        return new Map();
    }
    // @ts-expect-error queryManager is private method
    return client.queryManager.queries;
}
function getAllQueries(client) {
    const queryMap = extractQueries(client);
    const allQueries = getQueries(queryMap);
    return allQueries;
}
function getMutationData(allMutations) {
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
function getAllMutations(client) {
    // @ts-expect-error private method
    const allMutations = client.queryManager.mutationStore || {};
    const final = getMutationData(allMutations);
    return final;
}
function getCurrentState(client) {
    tick++;
    let currentState;
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
function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-expect-error add typings for this
            func.apply(this, args);
        }, timeout);
    };
}
//# sourceMappingURL=useApolloClientDevTools.js.map