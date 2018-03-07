import { buildGetQuery, executeAllDealsQuery, executeGetDealQuery } from "../plugins/api";

export const state = () => ({
    dealRows: null,
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    storageFilter: "Any",
    selectedDeal: null
});

export const getters = {
    namespace: () => "iPhoneXStore",
    dealsPerRow: () => 3,
    modelFilter: () => "iPhoneX",
    osFilter: () => "iOS",
    availableColours: () => [
        { display: "Any", coded: "Any" },
        { display: "Silver", coded: "Silver" },
        { display: "Space Grey", coded: "Space_Grey" }
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
    availableStorages: () => [
        { display: "Any", coded: "Any" },
        { display: "64 GB", coded: "GB64" },
        { display: "256 GB", coded: "GB256" }
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

// const namespace = "iPhoneXStore";

export const actions = {
    async initDealsPageAction ({ commit, getters }) {
        const { dealsPerRow, modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async networksFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : networkFilter } = target;
        const { storageFilter, colourFilter } = state;
        const { dealsPerRow, modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { networkFilter });
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async storageFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : storageFilter } = target;
        const { networkFilter, colourFilter } = state;
        const { dealsPerRow, modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { storageFilter });
        commit("dealsChangedMutation", { namespace, deals, dealsPerRow }, { root: true });
    },
    async colourFilterChangedAction( { commit, state, getters }, { target }) {
        const { value: colourFilter } = target;
        const { networkFilter, storageFilter } = state;
        const { dealsPerRow, modelFilter, osFilter, namespace } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter } );
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
    storageFilterChangedMutation(state, { storageFilter }) {
        state.storageFilter = storageFilter;
    },
    colourFilterChangedMutation(state, { colourFilter }) {
        state.colourFilter = colourFilter;
    }
};