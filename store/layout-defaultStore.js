export const state = () => ({
    menuOpen: false,
    showCookieSettings: true,
    gaAllowed: true
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
    },
    showCookieSettingsClickedAction ({ commit }) {
        commit("showCookieSettingsClickedMutation");
    },
    gaAllowedChangedAction ({ commit }, { target }) {
        const { checked } = target;
        commit("gaAllowedChangedMutation", checked);
    },
    saveCookiePrefsClickedAction ({ commit }) {
        commit("saveCookiePrefsClickedMutation");
    }
};

export const mutations = {
    menuToggledMutation (state) {
        state.menuOpen = !state.menuOpen;
    },
    routeNameChangedMutation (state) {
        state.menuOpen = false;
    },
    menuLinkClickedMutation(state) {
        state.menuOpen = false;
    },
    showCookieSettingsClickedMutation(state) {
        state.showCookieSettings = true;
    },
    gaAllowedChangedMutation(state, gaAllowed) {
        state.gaAllowed = gaAllowed;
    },
    saveCookiePrefsClickedMutation(state) {
        state.showCookieSettings = false;
    }
};