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
        aw_deep_link
        Telcos_device_full_name
        Telcos_deal_cost_json {
            upfront_inc_vat
            monthly_total_inc_vat
            monthly_contract_term_months
        }
        Telcos_device_features_json {
            colour
            megapixels
            capacity
        }
        Telcos_network_details_json{
            name
        }
      }
    }
    `);
    return dealsRes.data.data.allDealsFiltered;
};

