import { setDeals } from "./sharedMutations";

export default {
    networksFilterChangedMutation(state, { deals, selectedNetworkFilter }) {
        const { dealsPerRow } = state;
        state.selectedNetworkFilter = selectedNetworkFilter;
        setDeals(state, deals, dealsPerRow);
    },
    storageFilterChangedMutation(state, { deals, selectedStorageFilter }) {
        const { dealsPerRow } = state;
        state.selectedStorageFilter = selectedStorageFilter;
        setDeals(state, deals, dealsPerRow);
    },
    productVersionFilterChangedMutation(state, { deals, selectedProductVersionNameFilter }) {
        const { dealsPerRow } = state;
        state.selectedProductVersionName = selectedProductVersionNameFilter;
        setDeals(state, deals, dealsPerRow);
    },
    iPhoneColourFilterChangedMutation(state, { deals, selectediPhoneXColourFilter }) {
        const { dealsPerRow } = state;
        state.selectediPhoneXColour = selectediPhoneXColourFilter;
        setDeals(state, deals, dealsPerRow);
    }
};
