import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";
import { setDeals } from "../storeCustom/sharedMutations";

export const state = () => ({
    dealRows: null,
    deals: null,
    networkFilter: "Any",
    colourFilter: "Any",
    modelFilter: "S9Any"
});

export const getters = {
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
        const { dealsPerRow, osFilter } = getters;
        const { modelFilter } = state;
        const query = buildGetQuery({ osFilter, modelFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("initDealsPageMutation", { deals, dealsPerRow });
    },
    async networksFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : networkFilter } = target;
        const { colourFilter, modelFilter } = state;
        const { dealsPerRow, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networkFilterChangedMutation", { deals, dealsPerRow, networkFilter });
    },
    async modelFilterChangedAction( { commit, state, getters }, { target }) {
        const { value : modelFilter } = target;
        const { networkFilter, colourFilter } = state;
        const { dealsPerRow, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("modelFilterChangedMutation", { deals, dealsPerRow, modelFilter });
    },
    async colourFilterChangedAction( { commit, state, getters }, { target }) {
        const { value: colourFilter } = target;
        const { networkFilter, modelFilter } = state;
        const { dealsPerRow, osFilter } = getters;
        const query = buildGetQuery({ osFilter, modelFilter, networkFilter, colourFilter });
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
    modelFilterChangedMutation(state, { deals, dealsPerRow, modelFilter }) {
        state.modelFilter = modelFilter;
        setDeals(state, deals, dealsPerRow);
    },
    colourFilterChangedMutation(state, { deals, dealsPerRow, colourFilter }) {
        state.colourFilter = colourFilter;
        setDeals(state, deals, dealsPerRow);
    }
};