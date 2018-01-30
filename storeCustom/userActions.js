// import R from "ramda";
import { executeQuery } from "../plugins/api";

export default {
    async networksFilterChangedAction( { commit }, { target }) {
        const { value : selectedNetworkFilter } = target;
        const query = `
        {
            allDealsFiltered(
                merchantCategory:MobilePhone, 
            operatingSystem: iOS, 
            contractType: Contract, 
            productVersionName:iPhoneX, 
            numberOfTexts: Unlimited,
            talkMinutes: Unlimited,
            network: ${selectedNetworkFilter},
            sortBy:TCO_ASC
          ) 
          {
            aw_deep_link
            Telcos_device_full_name
            Telcos_initial_cost
            Telcos_month_cost
            Telcos_term
            Telcos_storage_size
            Telcos_network
            Telcos_network_details_json {
              name,
              logo_url
            }
            product_name
            Telcos_inc_data
          }
        }
        `;
        const { $axios: axios } = this;
        const deals = await executeQuery(axios, query);
        commit("networksFilterChangedMutation", { deals, selectedNetworkFilter });
    }
    // typeChangedAction ({ commit }, newType) {
    //     commit("typeChangedMutation", newType);
    // },
    // currentMonthlyCostChangedAction ({ commit }, { target }) {
    //     commit("currentMonthlyCostHasChangedMutation", parseInt(target.value));
    // },
    // postCodeChangedAction ({ commit }, { target }) {
    //     commit("postCodeHasChangedMutation", target.value);
    // },
    // addressGroupChangedAction ({ commit }, { target }) {
    //     commit("addressGroupChangedMutation", target.id);
    // },
    // addressChangedAction ({ commit }, address) {
    //     commit("addressChangedMutation", address);
    // },
    // toggleDetailsAction ({ commit }, quoteHash) {
    //     commit("toggleDetailsMutation", quoteHash);
    // },
    // currentSupplierChangedAction ({ commit }, selectedCurrentSupplier) {
    //     commit("currentSupplierChangedMutation", selectedCurrentSupplier);
    // },
    // firstNameChangedAction ({ commit }, { target }) {
    //     commit("firstNameChangedMutation", target.value);
    // },
    // lastNameChangedAction ({ commit }, { target }) {
    //     commit("lastNameChangedMutation", target.value);
    // },
    // positionChangedAction ({ commit }, { target }) {
    //     commit("positionChangedMutation", target.value);
    // },
    // emailChangedAction ({ commit }, { target }) {
    //     commit("emailChangedMutation", target.value);
    // },
    // telephoneChangedAction ({ commit }, { target }) {
    //     commit("telephoneChangedMutation", target.value);
    // },
    // businessTypeChangedAction ({ commit }, businessType) {
    //     commit("businessTypeChangedMutation", businessType);
    // },
    // businessNameChangedAction ({ commit }, { target }) {
    //     commit("businessNameChangedMutation", target.value);
    // },
    // companyPickChangedAction ({ commit }, company) {
    //     commit("companyPickChangedMutation", R.omit(["display"], company));
    // },
    // creditCheckAcceptedChangedAction ({ commit }, { target }) {
    //     commit("creditCheckAcceptedChangedMutation", target.checked);
    // },
    // accountHolder1ChangedAction ({ commit }, { target }) {
    //     commit("accountHolder1ChangedMutation", target.value);
    // },
    // accountHolder2ChangedAction ({ commit }, { target }) {
    //     commit("accountHolder2ChangedMutation", target.value);
    // },
    // accountNumberChangedAction ({ commit }, { target }) {
    //     commit("accountNumberChangedMutation", target.value);
    // },
    // sortCodeChangedAction ({ commit }, { target }) {
    //     commit("sortCodeChangedMutation", target.value);
    // },
    // tncAcceptedChangedAction ({ commit }, { target }) {
    //     commit("tncAcceptedChangedMutation", target.checked);
    // },
    // async getBankDetailsClickedAction ({ commit, state }) {
    //     const bank = await getBank(state);
    //     commit("banksReturnedMutation", bank);
    // },
    // async searchForCompanyAction ({ commit, state }) {
    //     const companies = await searchForCompany(state);
    //     commit("searchForCompanyReturnedMutation", companies);
    // },
    // async getAddressesAction ({ commit, state }) {
    //     const unGroupedAddresses = await getAddressesPickList(state);
    //     commit("addressesReturnedMutation", { unGroupedAddresses, type: state.type });
    // },
    // async signContractClickedAction ({ commit, state }) {
    // }
};
