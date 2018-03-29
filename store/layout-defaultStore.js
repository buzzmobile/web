export const state = () => ({
    menuOpen: false,
    showCookieSettings: false,
    gaAllowed: null,
    cookieLib: null,
    gaOnCookieValue: null
});

export const getters = {
    cookieLib: state =>  state.cookieLib,
    gaOnOffCookieName: () => "GAOnOff",    
};

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
    gaAllowedChangedAction ({ commit, getters }, { target }) {
        const { checked: gaAllowed } = target;
        const { gaOnOffCookieName, cookieLib } = getters;
        commit("gaAllowedChangedMutation", { gaAllowed, gaOnOffCookieName, cookieLib });
    },
    saveCookiePrefsClickedAction ({ commit, state, getters }) {
        const { gaOnOffCookieName, cookieLib } = getters;
        const { gaAllowed } = state;
        commit("gaAllowedChangedMutation", { gaAllowed, gaOnOffCookieName, cookieLib });
        commit("saveCookiePrefsClickedMutation");
    },
    initCookieStateAction({ commit, getters }, cookieLib) {
        const { gaOnOffCookieName } = getters;
        const gaOnCookieValue = cookieLib.get(gaOnOffCookieName);
        commit("initCookieLibMutation", cookieLib);
        commit("initShowCookieSettingsMutation", gaOnCookieValue);
        commit("initgaOnCookieValueMutation", gaOnCookieValue);
        commit("initGaAllowedMutation", gaOnCookieValue);
    },
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
    gaAllowedChangedMutation(state, { gaAllowed, gaOnOffCookieName, cookieLib }) {
        state.gaAllowed = gaAllowed;
        cookieLib.set(gaOnOffCookieName, gaAllowed, { expires: "1M" });
        state.gaOnCookieValue = cookieLib.get(gaOnOffCookieName);
    },
    initGaAllowedMutation(state, gaOnCookieValue) {
        if (gaOnCookieValue === null) {
            state.gaAllowed = true;
        } else {
            state.gaAllowed = gaOnCookieValue === "true" ? true : false;
        }
    },
    saveCookiePrefsClickedMutation(state) {
        state.showCookieSettings = false;
    },
    initCookieLibMutation(state, cookieLib) {
        state.cookieLib = cookieLib;
    },
    initShowCookieSettingsMutation(state, gaOnCookieValue) {
        state.showCookieSettings = gaOnCookieValue ? false : true;
    },
    initgaOnCookieValueMutation(state, gaOnCookieValue) {
        state.gaOnCookieValue = gaOnCookieValue;
    }
};