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
            selectediPhoneXStorage: "Any",
            availableiPhoneXStorage: [
                { display: "Any", coded: "Any" },
                { display: "64 GB", coded: "GB64" },
                { display: "256 GB", coded: "GB256" }
            ],
            availableS9ProductVersions: [
                { display: "Any", coded: "S9Any" },
                { display: "S9", coded: "S9" },
                { display: "S9 +", coded: "S9Plus" }
            ],
            selectedDeal: null,
            os: null,
            selectedProductVersionName: null
        },
        mutations,
        actions
    });
};

export default createStore;