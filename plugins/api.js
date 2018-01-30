export async function executeQuery (axios, query) {
    const dealsRes = await axios.get("/graphql", {
        params: {
            query
        }
    });
    return dealsRes.data.data.allDealsFiltered;
};