import { buildGetDealQuery, executeGetDealQuery } from "../plugins/api";

export const state = () => ({
    deal: null
});

export const getters = {
    deal: state => state.deal
};

export const actions = {
    async initBuyPageAction ({ commit }, { id }) {
        const query = buildGetDealQuery({ id });
        const { $axios: axios } = this;
        const deal = await executeGetDealQuery(axios, query);
        commit("initBuyPageMutation", { deal });
    }
};

export const mutations = {
    initBuyPageMutation (state, { deal }) {
        state.deal = deal;
    }
};
