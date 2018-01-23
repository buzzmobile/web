import userActions from "../storeCustom/userActions";
import userMutations from "../storeCustom/userMutations";
import navigationActions from "../storeCustom/navigationActions";
import frameworkActions from "../storeCustom/frameworkActions";
import frameworkMutations from "../storeCustom/frameworkMutations";
import navigationMutations from "../storeCustom/navigationMutations";

export const mutations = Object.assign({}, userMutations, frameworkMutations, navigationMutations);
export const actions = Object.assign({}, userActions, frameworkActions, navigationActions);
export const state = () => {
    dealRows: null;
    deals: null;
    router: null;
    env: null;
};
