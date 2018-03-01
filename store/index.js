import Vuex from "vuex";

import userActions from "../storeCustom/userActions";
import userMutations from "../storeCustom/userMutations";
import navigationActions from "../storeCustom/navigationActions";
import navigationMutations from "../storeCustom/navigationMutations";

const mutations = Object.assign({}, userMutations, navigationMutations);
const actions = Object.assign({}, userActions, navigationActions);

const createStore = () => {
    return new Vuex.Store({
        state: {
            dealRows: null,
            deals: null,
            dealsPerRow: null,
            selectedNetworkFilter: "Any",
            availableNetworksDisplay: [
                { coded: "VirginMobile", display: "Virgin" }
            ],
            availableNetworks: [
                "Any",
                "BT",
                "EE",
                "Giffgaff",
                "iD",
                "O2",
                "Three",
                "VirginMobile",
                "Vodafone"
            ],
            selectedDeal: null,
            os: null,
            productVersionName: null
        },
        mutations,
        actions
    });
};

export default createStore;