import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";

export const state = () => ({
    dealRows: null,
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    modelFilter: "S9Any"
});

export const getters = {
    namespace: () => "s9Store",
    dealsPerRow: () => 3,
    osFilter: () => "Android",
    availableColours: () => [
        { display: "Any", coded: "Any" },
        { display: "Coral Blue", coded: "Coral_Blue" },
        { display: "Midnight Black", coded: "Midnight_Black" },
        { display: "Lilac Purple", coded: "Lilac_Purple" }
    ],
    availableNetworks: () => [
        "Any",
        "BT",
        "EE",
        "Giffgaff",
        "iD",
        "O2",
        "Three",
        "VirginMobile",
        "Vodafone"
    ],
    availableModels: () => [
        { display: "Any", coded: "S9Any" },
        { display: "S9", coded: "S9" },
        { display: "S9 +", coded: "S9Plus" }
    ],
    getNetworkDisplayName: state => network => {
        const availableNetworksDisplay = [
            { coded: "VirginMobile", display: "Virgin" }
        ];
        const hasDisplay = availableNetworksDisplay.find(
            a => a.coded === network
        );
        return hasDisplay ? hasDisplay.display : network;
    },
};

export const actions = {
    async initDealsPageAction ({ commit, getters, state }) {
        const { dealsPerRow, osFilter, namespace } = getters;
        const { modelFilter } = state;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async networksFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : networkFilter } = target;
        const { colourFilter, modelFilter } = state;
        const { dealsPerRow, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { networkFilter });
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async modelFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : modelFilter } = target;
        const { networkFilter, colourFilter } = state;
        const { dealsPerRow, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("modelFilterChangedMutation", { modelFilter });
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async colourFilterChangedAction( { commit, state, getters }, { target }) {
        const { value: colourFilter } = target;
        const { networkFilter, modelFilter } = state;
        const { dealsPerRow, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("colourFilterChangedMutation", { colourFilter });
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
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
    }
};