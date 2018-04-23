import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";

export const state = () => ({
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    modelFilter: "S9Any"
});

export const getters = {
    namespace: () => "s9Store",
    osFilter: () => "Android",
    availableColours: () => [
        { display: "Any", coded: "Any" },
        { display: "Coral Blue", coded: "Coral_Blue" },
        { display: "Midnight Black", coded: "Midnight_Black" },
        { display: "Lilac Purple", coded: "Lilac_Purple" }
    ],
    availableNetworks: () => [
        { display: "Any", coded: "Any" },
        { display: "BT", coded: "BT" },
        { display: "EE", coded: "EE" },
        { display: "O2", coded: "O2" },
        { display: "Three", coded: "Three" },
        { display: "Vodafone", coded: "Vodafone" },
    ],
    availableModels: () => [
        { display: "Any", coded: "S9Any" },
        { display: "S9", coded: "S9" },
        { display: "S9 +", coded: "S9Plus" }
    ],
};

export const actions = {
    async initDealsPageAction ({ commit, getters, state }) {
        if (process.client && state.deals) {
            return;
        }
        const { osFilter, namespace } = getters;
        const { modelFilter } = state;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("dealsChangedMutation", { deals });
    },
    async networksFilterChangedAction( { commit, state, getters }, networkFilter) {
        const { colourFilter, modelFilter } = state;
        const { osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { networkFilter });
        commit("dealsChangedMutation", { deals });
    },
    async modelFilterChangedAction( { commit, state, getters }, modelFilter) {
        const { networkFilter, colourFilter } = state;
        const { osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("modelFilterChangedMutation", { modelFilter });
        commit("dealsChangedMutation", { deals });
    },
    async colourFilterChangedAction( { commit, state, getters }, colourFilter) {
        const { networkFilter, modelFilter } = state;
        const { osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("colourFilterChangedMutation", { colourFilter });
        commit("dealsChangedMutation", { deals });
    }
};

export const mutations = {
    networkFilterChangedMutation(state, { networkFilter }) {
        state.networkFilter = networkFilter;
    },
    modelFilterChangedMutation(state, { modelFilter }) {
        state.modelFilter = modelFilter;
    },
    colourFilterChangedMutation(state, { colourFilter }) {
        state.colourFilter = colourFilter;
    },
    dealsChangedMutation(state, { deals }) {
        state.deals = deals;
    }
};