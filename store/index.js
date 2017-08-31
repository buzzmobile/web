import userActions from "../storeCustom/userActions";
import userMutations from "../storeCustom/userMutations";
import navigationActions from "../storeCustom/navigationActions";
import frameworkActions from "../storeCustom/frameworkActions";
import frameworkMutations from "../storeCustom/frameworkMutations";
import navigationMutations from "../storeCustom/navigationMutations";

export const mutations = Object.assign({}, userMutations, frameworkMutations, navigationMutations);
export const actions = Object.assign({}, userActions, frameworkActions, navigationActions);
export const state = {
    switchId: null,
    usageId: null,
    pricesId: null,
    detailsId: null,
    creditReportId: null,
    creditCheckId: null,
    reviewId: null,
    summaryId: null,
    postCode: "BR1 1LT",
    type: "electricity",
    typeHasChanged: false,
    currentMonthlyCost: 250,
    currentMonthlyCostHasChanged: false,
    selectedAddressGroupId: null,
    selectedAddressId: null,
    selectedAddressIdHasChanged: false,
    whitelabel: "energyscanner",
    noQuotes: false,
    showDetailsFor: null,
    currentSupplier: "British Gas",
    currentSupplierHasChanged: null,
    email: "harry+nuxtlocal@unomee.com",
    estimateRenewalDate: true,
    firstName: "harry",
    lastName: "patel",
    position: "CTO",
    renewalDate: null,
    telephone: "01480 217079",
    creditCheckAccepted: true,
    businessName: "Unomee",
    accountHolder1: "Paul",
    accountHolder2: "Sally",
    accountNumber: "78956489",
    sortCode: "401002",
    tncAccepted: true,
    switchConfirmed: false,
    businessType: { type: "ltd", display: "Limited Company" },
    user: {
        nonce: null
    },
    companyPick: null,
    bank: null,
    bankDisplay: null,
    businessTypePickList: [{ type: "ltd", display: "Limited Company" }, { type: "llp", display: "LLP" }, { type: "nlc", display: "Sole Trader" }],
    companyPickList: null,
    addressGroups: null,
    selectedQuote: null,
    selectedReviewQuote: null,
    currentSupplierPickList: null,
    selectedAddress: null,
    quotes: null,
    reviewQuotes: null,
    quotesMeta: null,
    router: null,
    env: null
};
