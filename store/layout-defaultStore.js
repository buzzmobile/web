export const state = () => ({
    open: false
});

export const actions = {
    async menuToggledAction ({ commit }) {
        commit("menuToggledMutation");
    }
};

export const mutations = {
    menuToggledMutation (state) {
        state.open = !state.open;
    }
};