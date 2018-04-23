import { buildGetQuery, executeAllDealsQuery, executeGetDealQuery } from "../plugins/api";

export const state = () => ({
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    storageFilter: "Any"
});

export const getters = {
    namespace: () => "iPhoneXStore",
    modelFilter: () => "iPhoneX",
    osFilter: () => "iOS",
    availableColours: () => [
        { display: "Any", coded: "Any" },
        { display: "Silver", coded: "Silver" },
        { display: "Space Grey", coded: "Space_Grey" }
    ],
    availableNetworks: () => [
        { display: "Any", coded: "Any" },
        { display: "BT", coded: "BT" },
        { display: "EE", coded: "EE" },
        { display: "O2", coded: "O2" },
        { display: "Three", coded: "Three" },
        { display: "Vodafone", coded: "Vodafone" },
    ],
    availableStorages: () => [
        { display: "Any", coded: "Any" },
        { display: "64 GB", coded: "GB64" },
        { display: "256 GB", coded: "GB256" }
    ],
};

export const actions = {
    async initDealsPageAction ({ commit, getters, state }) {
        if (process.client && state.deals) {
            return;
        }
        const { modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("dealsChangedMutation", { deals });
    },
    async networksFilterChangedAction( { commit, state, getters }, networkFilter) {
        const { storageFilter, colourFilter } = state;
        const { modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { networkFilter });
        commit("dealsChangedMutation", { deals });
    },
    async storageFilterChangedAction( { commit, state, getters }, storageFilter) {
        const { networkFilter, colourFilter } = state;
        const { modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { storageFilter });
        commit("dealsChangedMutation", { deals });
    },
    async colourFilterChangedAction( { commit, state, getters }, colourFilter) {
        const { networkFilter, storageFilter } = state;
        const { modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter } );
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
    storageFilterChangedMutation(state, { storageFilter }) {
        state.storageFilter = storageFilter;
    },
    colourFilterChangedMutation(state, { colourFilter }) {
        state.colourFilter = colourFilter;
    },
    dealsChangedMutation(state, { deals }) {
        state.deals = deals;
    }
};