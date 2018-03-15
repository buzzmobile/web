export const state = () => ({
    open: false
});

export const actions = {
    menuToggledAction ({ commit }) {
        commit("menuToggledMutation");
    },
    routeNameChangedAction ({ commit }) {
        commit("routeNameChangedMutation");
    },
    menuLinkClickedAction ({ commit }) {
        commit("menuLinkClickedMutation");
    }
};

export const mutations = {
    menuToggledMutation (state) {
        state.open = !state.open;
    },
    routeNameChangedMutation (state) {
        state.open = false;
    },
    menuLinkClickedMutation(state) {
        state.open = false;
    }
};