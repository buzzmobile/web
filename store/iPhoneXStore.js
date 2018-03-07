import { buildGetQuery, executeAllDealsQuery, executeGetDealQuery } from "../plugins/api";
import { setDeals } from "../storeCustom/sharedMutations";

export const state = () => ({
    dealRows: null,
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    storageFilter: "Any",
    selectedDeal: null
});

export const getters = {
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

export const actions = {
    async initDealsPageAction ({ commit, getters }) {
        const { dealsPerRow, modelFilter, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("initDealsPageMutation", { deals, dealsPerRow });
    },
    async networksFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : networkFilter } = target;
        const { storageFilter, colourFilter } = state;
        const { dealsPerRow, modelFilter, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { deals, dealsPerRow, networkFilter });
    },
    async storageFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : storageFilter } = target;
        const { networkFilter, colourFilter } = state;
        const { dealsPerRow, modelFilter, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { deals, dealsPerRow, storageFilter });
    },
    async colourFilterChangedAction( { commit, state, getters }, { target }) {
        const { value: colourFilter } = target;
        const { networkFilter, storageFilter } = state;
        const { dealsPerRow, modelFilter, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, storageFilter, colourFilter } );
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("colourFilterChangedMutation", { deals, dealsPerRow, colourFilter });
    }
};

export const mutations = {
    initDealsPageMutation (state, { deals, dealsPerRow }) {
        setDeals(state, deals, dealsPerRow);
    },
    networkFilterChangedMutation(state, { deals, dealsPerRow, networkFilter }) {
        state.networkFilter = networkFilter;
        setDeals(state, deals, dealsPerRow);
    },
    storageFilterChangedMutation(state, { deals, dealsPerRow, storageFilter }) {
        state.storageFilter = storageFilter;
        setDeals(state, deals, dealsPerRow);
    },
    colourFilterChangedMutation(state, { deals, dealsPerRow, colourFilter }) {
        state.colourFilter = colourFilter;
        setDeals(state, deals, dealsPerRow);
    }
};