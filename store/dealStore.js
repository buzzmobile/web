import { buildGetDealQuery, executeGetDealQuery } from "../plugins/api";

export const state = () => ({
    deal: null
});

export const getters = {
    deal: state => state.deal,
    imageKey: () => deal => {
        const model = deal.Telcos_device_product_version_json.product_version_name.toLowerCase().replace(" ", "-");
        const colour = deal.Telcos_device_features_json.colour.toLowerCase().replace(" ", "-");
        return `${model}-${colour}`;
    },
    backUrl: () => deal => {
        if (deal.Telcos_device_product_version_json.product_version_name === "X") {
            return "/mobile-phones/apple/iphonex";
        }
        return "/mobile-phones/samsung/s9";
    }
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
