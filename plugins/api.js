export async function executeAllDealsQuery (axios, query) {
    const queryResult = await getQueryResult(axios, query);
    return queryResult.data.data.allDealsFiltered;
};

export async function executeGetDealQuery (axios, query) {
    const queryResult = await getQueryResult(axios, query);
    return queryResult.data.data.getDealById;
};

async function getQueryResult(axios, query) {
    return axios.get("/graphql", {
        params: {
            query
        }
    });
}