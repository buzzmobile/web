// import * as api from "../plugins/api";

/*
    actions:
        - that result in a change of url
        - caused by a change in the url (e.g. manual edit of address in address bar)
        - a page refresh (user hitting F5)
        - first time navigation to the site (e.g. email link)
*/

export default {
    // initPricesPageServerSideAction ({ commit }, { switchData, quoteMetaAndData }) {
    //     commit("initPricesPageServerSideMutation", { switchData, quoteMetaAndData });
    // },
    // initPricesPageClientSideAction ({ commit }, quoteMetaAndData) {
    //     commit("initPricesPageClientSideMutation", quoteMetaAndData);
    // },
    // initDetailsPageServerSideAction ({ commit }, { switchData, currentSupplierPickList, companyPickList }) {
    //     commit("initDetailsPageServerSideMutation", { switchData, currentSupplierPickList, companyPickList });
    // },
    // initDetailsPageClientSideAction ({ commit }, currentSupplierPickList) {
    //     commit("initDetailsPageClientSideMutation", currentSupplierPickList);
    // },
    // initReviewPageClientSideAction ({ commit }, { quoteMetaAndData }) {
    //     commit("initReviewPageClientSideMutation", { quoteMetaAndData });
    // },
    // initReviewPageServerSideAction ({ commit }, { switchData, quoteMetaAndData, redirect }) {
    //     commit("initReviewPageServerSideMutation", { switchData, quoteMetaAndData, redirect });
    // },
    // initSummaryPageClientSideAction ({ commit }) {
    //     commit("initSummaryPageClientSideMutation");
    // },
    // initSummaryPageServerSideAction ({ commit }, { switchData, redirect }) {
    //     commit("initSummaryPageServerSideMutation", { switchData, redirect });
    // },
    initFilteredPageAction ({ commit }, { deals, dealsPerRow }) {
        commit("initFilteredPageMutation", { deals, dealsPerRow });
    }
    // async quoteSelectedAction ({ commit, state }, quote) {
    //     const { switchId } = state;
    //     const usageData = await api.upsertUsage(switchId, state);
    //     const quoteData = await api.upsertQuote(switchId, state, quote);
    //     commit("quoteSelectedMutation", { usageData, quoteData });
    // },
    // async reviewQuoteSelectedAction ({ commit, state }, review) {
    //     const { switchId } = state;
    //     const reviewData = await api.upsertReview(switchId, state, review);
    //     commit("reviewQuoteSelectedMutation", reviewData);
    // },
    // async showInitialQuotesAction ({ commit, state }) {
    //     const createResponse = await api.createSwitch(state);
    //     const { _id: switchId } = createResponse;
    //     await api.upsertStart(switchId, state);
    //     commit("showInitialQuotesMutation", createResponse);
    // },
    // async submitDetailsAction ({ commit, state }) {
    //     const { switchId } = state;
    //     const detailsData = await api.upsertDetails(switchId, state);
    //     const nonce = await api.ensureNonce(state);
    //     await api.associateSwitchAndUser(state, nonce);
    //     const creditReportFrag = await api.getCreditReportFrag(state);
    //     const creditCheckData = await api.upsertCreditCheck(switchId, state, creditReportFrag);
    //     commit("submitDetailsMutation", { detailsData, nonce, creditReportFrag, creditCheckData });
    // },
    // async submitSummaryAction ({ commit, state }) {
    //     const { switchId } = state;
    //     const summaryData = await api.upsertSummary(switchId, state);
    //     commit("submitSummaryMutation", summaryData);
    // }
};
