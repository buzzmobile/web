import { buildGetQuery, executeAllDealsQuery, executeGetDealQuery } from "../plugins/api";
import { setDeals } from "../storeCustom/sharedMutations";

export const state = () => ({
    dealRows: null,
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    modelFilter: "S9Any",
    selectedDeal: null
});

export const getters = {
    dealsPerRow: () => 3,
    os: () => "Android",
    storageFilter: () => "Any",
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
        const { dealsPerRow, os } = getters;
        const { modelFilter } = state;
        const query = buildGetQuery(os, modelFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("initDealsPageMutation", { deals, dealsPerRow });
    },
    async networksFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : networkFilter } = target;
        const { colourFilter, modelFilter } = state;
        const { dealsPerRow, os, storageFilter } = getters;
        const query = buildGetQuery(os, modelFilter, networkFilter, storageFilter, colourFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networksFilterChangedMutation", { deals, dealsPerRow, networkFilter });
    },
    async modelFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : modelFilter } = target;
        const { networkFilter, colourFilter } = state;
        const { dealsPerRow, os, storageFilter } = getters;
        const query = buildGetQuery(os, modelFilter, networkFilter, storageFilter, colourFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("modelFilterChangedMutation", { deals, dealsPerRow, modelFilter });
    },
    async colourFilterChangedAction( { commit, state, getters }, { target }) {
        const { value: colourFilter } = target;
        const { networkFilter, modelFilter } = state;
        const { dealsPerRow, storageFilter, os } = getters;
        const query = buildGetQuery(os, modelFilter, networkFilter, storageFilter, colourFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("colourFilterChangedMutation", { deals, dealsPerRow, colourFilter });
    }
};

export const mutations = {
    initDealsPageMutation (state, { deals, dealsPerRow }) {
        setDeals(state, deals, dealsPerRow);
    },
    networksFilterChangedMutation(state, { deals, dealsPerRow, networkFilter }) {
        state.networkFilter = networkFilter;
        setDeals(state, deals, dealsPerRow);
    },
    modelFilterChangedMutation(state, { deals, dealsPerRow, modelFilter }) {
        state.modelFilter = modelFilter;
        setDeals(state, deals, dealsPerRow);
    },
    colourFilterChangedMutation(state, { deals, dealsPerRow, colourFilter }) {
        state.colourFilter = colourFilter;
        setDeals(state, deals, dealsPerRow);
    }
};