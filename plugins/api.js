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

export function buildGetQuery (os, productVersionName, network = "Any", storage = "Any", colour = "Any") {
    return `
    {
      allDealsFiltered(
        merchantCategory:MobilePhone, 
        operatingSystem: ${os}, 
        productVersionName: ${productVersionName}, 
        contractType: Contract, 
        numberOfTexts: Unlimited,
        talkMinutes: Unlimited,
        network: ${network},
        merchant: e2saveNot,
        storageSize: ${storage},
        colour: ${colour},
        sortBy:TCO_ASC
      ) 
      {
        id
        merchant_name
        Telcos_device_full_name
        Telcos_initial_cost
        Telcos_month_cost
        Telcos_term
        Telcos_storage_size
        Telcos_network
        product_name
        Telcos_inc_data
        Telcos_device_features_json {
          colour
        }
      }
    }
    `;
};