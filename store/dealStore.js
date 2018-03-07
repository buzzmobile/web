import { buildGetDealQuery, executeGetDealQuery } from "../plugins/api";

export const state = () => ({
    deal: null
});

export const getters = {
    deal: state => state.deal
};

export const actions = {
    async initDealPageAction ({ commit }, { id }) {
        const query = buildGetDealQuery({ id });
        const { $axios: axios } = this;
        const deal = await executeGetDealQuery(axios, query);
        commit("initDealPageMutation", { deal });
    }
};

export const mutations = {
    initDealPageMutation (state, { deal }) {
        state.deal = deal;
    }
};
