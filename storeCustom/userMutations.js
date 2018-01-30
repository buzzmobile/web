import { setDeals } from "./sharedMutations";

export default {
    networksFilterChangedMutation(state, { deals, selectedNetworkFilter }) {
        const { dealsPerRow } = state;
        state.selectedNetworkFilter = selectedNetworkFilter;
        setDeals(state, deals, dealsPerRow);
    }

    // addressesReturnedMutation (state, { unGroupedAddresses, type }) {
    //     state.addressGroups = makeAddressesUiFriendly({ unGroupedAddresses, type });
    // },
    // postCodeHasChangedMutation (state, newPostCode) {
    //     state.postCode = newPostCode;
    // },
    // currentMonthlyCostHasChangedMutation (state, newCurrentMonthlyCost) {
    //     state.currentMonthlyCostHasChanged = (state.currentMonthlyCost !== newCurrentMonthlyCost);
    //     state.currentMonthlyCost = newCurrentMonthlyCost;
    // },
    // typeChangedMutation (state, newType) {
    //     state.typeHasChanged = (state.type !== newType);
    //     if (state.typeHasChanged) {
    //         state.addressGroups = null;
    //         state.selectedAddressGroupId = null;
    //         state.selectedAddressId = null;
    //         state.selectedAddress = null;
    //     }
    //     state.type = newType;
    // },
    // addressGroupChangedMutation (state, selectedAddressGroupId) {
    //     const addresses = state.addressGroups.find(R.propEq("id", selectedAddressGroupId)).addresses;
    //     const newAddressId = (addresses.length === 1 ? addresses[0].id : undefined);
    //     state.selectedAddressIdHasChanged = (state.selectedAddressId !== newAddressId);
    //     state.selectedAddressId = newAddressId;
    //     state.selectedAddressGroupId = selectedAddressGroupId;
    // },
    // addressChangedMutation (state, address) {
    //     const newAddressId = address.id;
    //     const addressIdHasChanged = (state.selectedAddressId !== newAddressId);
    //     state.selectedAddress = (addressIdHasChanged ? null : state.selectedAddress);
    //     state.selectedAddressIdHasChanged = addressIdHasChanged;
    //     state.selectedAddressId = newAddressId;
    // },
    // toggleDetailsMutation (state, quoteHash) {
    //     state.showDetailsFor = (state.showDetailsFor === quoteHash ? null : quoteHash);
    // },
    // currentSupplierChangedMutation (state, selectedCurrentSupplier) {
    //     state.currentSupplierHasChanged = (state.currentSupplier !== selectedCurrentSupplier);
    //     state.currentSupplier = selectedCurrentSupplier;
    // },
    // firstNameChangedMutation (state, newFirstName) {
    //     state.firstName = newFirstName;
    // },
    // lastNameChangedMutation (state, newlastName) {
    //     state.lastName = newlastName;
    // },
    // positionChangedMutation (state, newPosition) {
    //     state.position = newPosition;
    // },
    // emailChangedMutation (state, newEmail) {
    //     state.email = newEmail;
    // },
    // telephoneChangedMutation (state, newTelephone) {
    //     state.telephone = newTelephone;
    // },
    // businessTypeChangedMutation (state, businessType) {
    //     state.businessType = businessType;
    // },
    // businessNameChangedMutation (state, newBusinessName) {
    //     state.businessName = newBusinessName;
    // },
    // searchForCompanyReturnedMutation (state, companies) {
    //     state.companyPickList = companies.map(c => Object.assign(c, { display: `${c.title} | ${c.companyNumber} | ${c.snippet}` }));
    // },
    // companyPickChangedMutation (state, company) {
    //     state.companyPick = company;
    // },
    // creditCheckAcceptedChangedMutation (state, newCreditCheckAccepted) {
    //     state.creditCheckAccepted = newCreditCheckAccepted;
    // },
    // accountHolder1ChangedMutation (state, newAccountHolder1) {
    //     state.accountHolder1 = newAccountHolder1;
    // },
    // accountHolder2ChangedMutation (state, newAccountHolder2) {
    //     state.accountHolder2 = newAccountHolder2;
    // },
    // accountNumberChangedMutation (state, newAccountNumber) {
    //     state.accountNumber = newAccountNumber;
    // },
    // sortCodeChangedMutation (state, newSortCode) {
    //     state.sortCode = newSortCode;
    // },
    // tncAcceptedChangedMutation (state, newTnCAccepted) {
    //     state.tncAccepted = newTnCAccepted;
    // },
    // banksReturnedMutation (state, bank) {
    //     state.bank = bank;
    //     state.bankDisplay = bank.snippet;
    // }
};
