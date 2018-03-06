import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";

export default {
    async networksFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedNetworkFilter } = target;
        const { os, selectedProductVersionName, selectedStorageFilter, selectedColour } = state;
        const query = buildGetQuery(os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter, selectedColour);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networksFilterChangedMutation", { deals, selectedNetworkFilter });
    },
    async storageFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedStorageFilter } = target;
        const { os, selectedProductVersionName, selectedNetworkFilter, selectedColour } = state;
        const query = buildGetQuery(os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter, selectedColour);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { deals, selectedStorageFilter });
    },
    async productVersionNameFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedProductVersionNameFilter } = target;
        const { os, selectedNetworkFilter, selectedColour } = state;
        const query = buildGetQuery(os, selectedProductVersionNameFilter, selectedNetworkFilter, "Any", selectedColour);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("productVersionFilterChangedMutation", { deals, selectedProductVersionNameFilter });
    },
    async colourFilterChangedAction( { commit, state }, { target }) {
        const { value: selectedColourFilter } = target;
        const { os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter } = state;
        const query = buildGetQuery(os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter, selectedColourFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("colourFilterChangedMutation", { deals, selectedColourFilter });
    }
};
