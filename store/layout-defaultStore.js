export const state = () => ({
    open: false
});

export const actions = {
    async menuToggledAction ({ commit }) {
        commit("menuToggledMutation");
    },
    routeNameChangedAction ({ commit }) {
        commit("routeNameChanged");
    }
};

export const mutations = {
    menuToggledMutation (state) {
        state.open = !state.open;
    },
    routeNameChanged (state) {
        state.open = false;
    }
};