import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";

export default {
    async networksFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedNetworkFilter } = target;
        const { os, productVersionName, selectedStorageFilter, selectedModelFilter } = state;
        const query = buildGetQuery(os, productVersionName, selectedNetworkFilter, selectedStorageFilter, selectedModelFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networksFilterChangedMutation", { deals, selectedNetworkFilter });
    },
    async storageFilterChanged( { commit, state }, { target }) {
        const { value : selectedStorageFilter } = target;
        const { os, productVersionName, selectedNetworkFilter, selectedModelFilter } = state;
        const query = buildGetQuery(os, productVersionName, selectedNetworkFilter, selectedStorageFilter, selectedModelFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { deals, selectedStorageFilter });
    }
};
