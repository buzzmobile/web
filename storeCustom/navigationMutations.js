import { setDeals } from "./sharedMutations";

export default {
    initDealsPageMutation (state, { deals, dealsPerRow }) {
        setDeals(state, deals, dealsPerRow);
    },
    initDealPageMutation (state, { deal }) {
        state.selectedDeal = deal;
    }
    // initPricesPageServerSideMutation (state, { switchData, quoteMetaAndData }) {
    //     mapServerSwitchToState(state, switchData);
    //     state.quotes = quoteMetaAndData.data;
    //     state.quotesMeta = quoteMetaAndData.meta;
    //     state.noQuotes = quoteMetaAndData.meta.noDataReason && quoteMetaAndData.meta.noDataReason !== "";
    // },
    // initDetailsPageServerSideMutation (state, { switchData, currentSupplierPickList, companyPickList }) {
    //     mapServerSwitchToState(state, switchData);
    //     state.currentSupplierPickList = currentSupplierPickList;
    //     if (companyPickList) {
    //         state.companyPickList = companyPickList.map(c => Object.assign(c, { display: `${c.title} | ${c.companyNumber} | ${c.snippet}` }));
    //     }
    // },
    // initReviewPageServerSideMutation (state, { switchData, quoteMetaAndData, redirect }) {
    //     mapServerSwitchToState(state, switchData);
    //     state.reviewQuotes = quoteMetaAndData.data;
    //     const { selectedQuote } = state;
    //     const selectedQuoteStillAvailable = quoteMetaAndData.data.find(x => x.enhanced.quoteHash === selectedQuote.enhanced.quoteHash);
    //     if (selectedQuoteStillAvailable) {
    //         const { switchId } = state;
    //         redirect(`/summary/${switchId}`);
    //     }
    // },
    // initSummaryPageServerSideMutation (state, { switchData, redirect }) {
    //     mapServerSwitchToState(state, switchData);
    //     if (state.switchConfirmed) {
    //         const { switchId } = state;
    //         redirect(`/complete/${switchId}`);
    //     }
    // },
    // initPricesPageClientSideMutation (state, quoteMetaAndData) {
    //     const { data, meta } = quoteMetaAndData;
    //     state.typeHasChanged = state.selectedAddressIdHasChanged = state.postCodeHasChanged = false;
    //     state.quotes = data;
    //     state.quotesMeta = meta;
    //     state.noQuotes = meta.noDataReason && meta.noDataReason !== "";
    // },
    // initDetailsPageClientSideMutation (state, currentSupplierPickList) {
    //     state.currentSupplierPickList = currentSupplierPickList;
    // },
    // initReviewPageClientSideMutation (state, { quoteMetaAndData }) {
    //     const { switchId, selectedQuote } = state;
    //     const selectedQuoteStillAvailable = quoteMetaAndData.data.find(x => x.enhanced.quoteHash === selectedQuote.enhanced.quoteHash);
    //     if (selectedQuoteStillAvailable) {
    //         state.router.push({ name: "summary-id", params: { id: switchId } });
    //     }
    // },
    // initSummaryPageClientSideMutation (state) {
    //     if (state.switchConfirmed) {
    //         const { switchId } = state;
    //         state.router.push({ name: "complete-id", params: { id: switchId } });
    //     }
    // },
    // showInitialQuotesMutation (state, { _id }) {
    //     state.switchId = _id;
    //     state.router.push({ name: "prices-id", params: { id: _id } });
    // },
    // quoteSelectedMutation (state, { usageData, quoteData }) {
    //     const { switchId } = state;
    //     state.selectedQuote = quoteData.quote;
    //     state.pricesId = quoteData._id;
    //     state.usageId = usageData._id;
    //     state.router.push({ name: "details-id", params: { id: switchId } });
    // },
    // reviewQuoteSelectedMutation (state, reviewData) {
    //     const { switchId } = state;
    //     state.selectedReviewQuote = reviewData.quote;
    //     state.reviewId = reviewData._id;
    //     state.router.push({ name: "summary-id", params: { id: switchId } });
    // },
    // submitDetailsMutation (state, { detailsData, nonce, creditReportFrag, creditCheckData }) {
    //     const { switchId } = state;
    //     const { _id: detailsId } = detailsData;
    //     const { _id: creditCheckId } = creditCheckData;
    //     const { creditReport } = creditReportFrag;
    //     const { _id: creditReportId } = creditReport;
    //     state.detailsId = detailsId;
    //     state.user.nonce = nonce;
    //     state.creditReportId = creditReportId;
    //     state.creditCheckId = creditCheckId;
    //     state.router.push({ name: "review-id", params: { id: switchId } });
    // },
    // submitSummaryMutation (state, summaryData) {
    //     const { switchId } = state;
    //     const { _id: summaryId } = summaryData;
    //     state.summaryId = summaryId;
    //     state.router.push({ name: "complete-id", params: { id: switchId } });
    // }
};
