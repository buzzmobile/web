import { executeAllDealsQuery, executeGetDealQuery } from "../plugins/api";

/*
actions:
- that result in a change of url
- caused by a change in the url (e.g. manual edit of address in address bar)
- a page refresh (user hitting F5)
- first time navigation to the site (e.g. email link)
*/

export default {
    async initDealsPageAction ({ commit }, { query, dealsPerRow, os, selectedProductVersionName, network, storage }) {
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("initDealsPageMutation", { deals, dealsPerRow, os, selectedProductVersionName });
    },
    async initDealPageAction ({ commit }, { query }) {
        const deal = await executeGetDealQuery(this.$axios, query);
        commit("initDealPageMutation", { deal });
    }
};
