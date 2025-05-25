import { print } from 'graphql';
export function getQueries(queryMap) {
    const queries = [];
    if (queryMap) {
        [...queryMap.values()].forEach(({ document, variables, observableQuery, diff, lastDiff }, queryId) => {
            if (document && observableQuery) {
                queries.push({
                    queryString: print(document),
                    variables,
                    cachedData: diff?.result || lastDiff?.diff?.result,
                    name: observableQuery?.queryName,
                    id: queryId?.toString(),
                });
            }
        });
    }
    return queries;
}
//# sourceMappingURL=utils.js.map