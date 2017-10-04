import axios from "axios";

async function runGraphQlQuery (baseApiUrl, query) {
    return axios.get(`${baseApiUrl}/graphql`, {
        params: {
            query
        }
    });
}

export async function getDeals (env, params) {
    const { baseApiUrl } = env;
    const dealsRes = await runGraphQlQuery(baseApiUrl, `
    {
      allDealsFiltered(merchantCategory:MobilePhone, operatingSystem: iOS) {
        Telcos_deal_cost_json {
          upfront_inc_vat
          upfront_exc_vat
          monthly_total_inc_vat
          monthly_total_exc_vat
        }
      }
    }
    `);
    return dealsRes.data.data.allDealsFiltered;
};

