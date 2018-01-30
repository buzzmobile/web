import Vuex from "vuex";

import userActions from "../storeCustom/userActions";
import userMutations from "../storeCustom/userMutations";
import navigationActions from "../storeCustom/navigationActions";
import frameworkActions from "../storeCustom/frameworkActions";
import frameworkMutations from "../storeCustom/frameworkMutations";
import navigationMutations from "../storeCustom/navigationMutations";

const mutations = Object.assign({}, userMutations, frameworkMutations, navigationMutations);
const actions = Object.assign({}, userActions, frameworkActions, navigationActions);

const createStore = () => {
    return new Vuex.Store({
        state:    {
            dealRows: null,
            deals: null,
            dealsPerRow: null,
            env: null,
            selectedNetworkFilter: "Any" 
        },
        mutations,
        actions
    });
};

export default createStore;