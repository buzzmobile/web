// const mapServerSwitchToState = (state, switchData) => {
//     state.switchId = switchData._id;
//     state.type = switchData.type;
//     state.whitelabel = switchData.whitelabel;
//     if (switchData.start) {
//         const s = switchData.start;
//         state.postCode = s.supplyPostcode;
//         state.selectedAddress = s.supplyAddress;
//         state.currentMonthlyCost = s.currentMonthlyCost;
//     }
//     if (switchData.prices) {
//         const p = switchData.prices;
//         state.selectedQuote = p.quote;
//         state.pricesId = p._id;
//     }
//     if (switchData.usage) {
//         state.usageId = switchData.usage._id;
//     }
//     if (switchData.details) {
//         const d = switchData.details;
//         state.detailsId = d._id;
//         state.currentSupplier = d.currentSupplier;
//         state.email = d.email;
//         state.estimateRenewalDate = d.estimateRenewalDate;
//         state.firstName = d.firstName;
//         state.lastName = d.lastName;
//         state.position = d.position;
//         state.renewalDate = d.renewalDate;
//         state.telephone = d.telephone;
//         state.companyPick = d.business.autocomplete;
//         state.businessName = d.business.name;
//         state.businessType = state.businessTypePickList.find(x => x.type === d.business.type);
//     }
//     if (switchData.review) {
//         const r = switchData.review;
//         state.reviewId = r._id;
//         state.selectedReviewQuote = r.quote;
//     }
//     if (switchData.summary) {
//         const s = switchData.summary;
//         state.summaryId = s._id;
//         state.accountHolder1 = s.accountHolder1Name;
//         state.accountHolder2 = s.accountHolder2Name;
//         state.accountNumber = s.accountNumber;
//         state.sortCode = s.accountSortCode.replace(/-/g, "");
//         state.bank = s.bank;
//         state.bankDisplay = s.bank.snippet;
//         state.tncAccepted = s.termsAccepted;
//         state.switchConfirmed = s.switchConfirmed;
//     }
// };

export default {
    initFilteredPageMutation (state, { deals, dealsPerRow }) {
        state.deals = deals;
        const dealRows = [];
        let dealColumn = [];
        for (let deal of state.deals) {
            dealColumn.push(deal);
            if (dealColumn.length === dealsPerRow) {
                dealRows.push(dealColumn);
                dealColumn = [];
            }
        }
        state.dealRows = dealRows;
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
