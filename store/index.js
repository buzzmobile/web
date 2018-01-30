import Vuex from "vuex";

import userActions from "../storeCustom/userActions";
import userMutations from "../storeCustom/userMutations";
import navigationActions from "../storeCustom/navigationActions";
import navigationMutations from "../storeCustom/navigationMutations";

const mutations = Object.assign({}, userMutations, navigationMutations);
const actions = Object.assign({}, userActions, navigationActions);

const createStore = () => {
    return new Vuex.Store({
        state:    {
            dealRows: null,
            deals: null,
            dealsPerRow: null,
            selectedNetworkFilter: "Any"
        },
        mutations,
        actions
    });
};

export default createStore;