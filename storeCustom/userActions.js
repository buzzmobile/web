import { buildGetQuery, executeAllDealsQuery } from "../plugins/api";

export default {
    async networksFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedNetworkFilter } = target;
        const { os, selectedProductVersionName, selectedStorageFilter } = state;
        const query = buildGetQuery(os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("networksFilterChangedMutation", { deals, selectedNetworkFilter });
    },
    async storageFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedStorageFilter } = target;
        const { os, selectedProductVersionName, selectedNetworkFilter } = state;
        const query = buildGetQuery(os, selectedProductVersionName, selectedNetworkFilter, selectedStorageFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("storageFilterChangedMutation", { deals, selectedStorageFilter });
    },
    async productVersionNameFilterChangedAction( { commit, state }, { target }) {
        const { value : selectedProductVersionNameFilter } = target;
        const { os, selectedNetworkFilter } = state;
        const query = buildGetQuery(os, selectedProductVersionNameFilter, selectedNetworkFilter);
        const { $axios: axios } = this;
        const deals = await executeAllDealsQuery(axios, query);
        commit("productVersionFilterChangedMutation", { deals, selectedProductVersionNameFilter });
    }
};
