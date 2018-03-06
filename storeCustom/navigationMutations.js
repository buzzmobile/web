import { setDeals } from "./sharedMutations";

export default {
    initDealsPageMutation (state, { deals, dealsPerRow, os, selectedProductVersionName, network, storage }) {
        state.os = os;
        state.selectedProductVersionName = selectedProductVersionName;
        state.selected;
        setDeals(state, deals, dealsPerRow);
    },
    initDealPageMutation (state, { deal }) {
        state.selectedDeal = deal;
    }
};
