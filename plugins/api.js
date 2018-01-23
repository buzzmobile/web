import axios from "axios";

async function runGraphQlQuery (baseApiUrl, query) {
    return axios.get(`${baseApiUrl}/graphql`, {
        params: {
            query
        }
    });
}

export async function getDeals (env, query) {
    const { baseApiUrl } = env;
    const dealsRes = await runGraphQlQuery(baseApiUrl, query);
    return dealsRes.data.data.allDealsFiltered;
};
